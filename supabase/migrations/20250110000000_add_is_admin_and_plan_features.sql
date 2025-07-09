-- Add is_admin column to profiles table
ALTER TABLE public.profiles 
    ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Set djuliusvdijk@protonmail.com as admin automatically
UPDATE public.profiles 
SET is_admin = TRUE 
WHERE email = 'djuliusvdijk@protonmail.com';

-- Create function to automatically set admin for the specific email on user creation
CREATE OR REPLACE FUNCTION public.handle_new_user_admin()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if this is the admin email
    IF NEW.email = 'djuliusvdijk@protonmail.com' THEN
        UPDATE public.profiles 
        SET is_admin = TRUE 
        WHERE id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to handle admin assignment on profile creation
CREATE OR REPLACE TRIGGER on_profile_created_set_admin
    AFTER INSERT ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_admin();

-- Create function to add admin (only callable by existing admins)
CREATE OR REPLACE FUNCTION public.add_admin(target_email TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    is_caller_admin BOOLEAN;
    target_user_id UUID;
BEGIN
    -- Check if caller is admin
    SELECT is_admin INTO is_caller_admin
    FROM public.profiles
    WHERE id = auth.uid();
    
    IF NOT is_caller_admin THEN
        RAISE EXCEPTION 'Only admins can add other admins';
    END IF;
    
    -- Find target user by email
    SELECT id INTO target_user_id
    FROM public.profiles
    WHERE email = target_email;
    
    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'User with email % not found', target_email;
    END IF;
    
    -- Update target user to admin
    UPDATE public.profiles
    SET is_admin = TRUE
    WHERE id = target_user_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create subscription limits and features view
CREATE OR REPLACE VIEW public.subscription_features AS
SELECT 
    s.user_id,
    CASE 
        WHEN s.plan_type LIKE '%pro%' THEN 'pro'::TEXT
        WHEN s.plan_type LIKE '%team%' THEN 'team'::TEXT
        ELSE 'free'::TEXT
    END as tier,
    s.status,
    CASE 
        WHEN s.plan_type LIKE '%pro%' THEN jsonb_build_object(
            'maxFocusSessions', -1,
            'aiCoaching', true,
            'teamCollaboration', false,
            'advancedStatistics', true,
            'calendarIntegration', true,
            'distractionBlocking', true,
            'prioritySupport', true,
            'ssoIntegration', false,
            'adminDashboard', false
        )
        WHEN s.plan_type LIKE '%team%' THEN jsonb_build_object(
            'maxFocusSessions', -1,
            'aiCoaching', true,
            'teamCollaboration', true,
            'advancedStatistics', true,
            'calendarIntegration', true,
            'distractionBlocking', true,
            'prioritySupport', true,
            'ssoIntegration', true,
            'adminDashboard', true
        )
        ELSE jsonb_build_object(
            'maxFocusSessions', 5,
            'aiCoaching', false,
            'teamCollaboration', false,
            'advancedStatistics', false,
            'calendarIntegration', false,
            'distractionBlocking', false,
            'prioritySupport', false,
            'ssoIntegration', false,
            'adminDashboard', false
        )
    END as features
FROM public.subscriptions s
WHERE s.status = 'active';

-- Create function to check if user has access to specific feature
CREATE OR REPLACE FUNCTION public.has_feature_access(feature_name TEXT, user_id_param UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
DECLARE
    user_features JSONB;
    feature_value BOOLEAN;
BEGIN
    -- Get user features
    SELECT features INTO user_features
    FROM public.subscription_features
    WHERE user_id = user_id_param;
    
    -- If no subscription found, default to free plan
    IF user_features IS NULL THEN
        user_features := jsonb_build_object(
            'maxFocusSessions', 5,
            'aiCoaching', false,
            'teamCollaboration', false,
            'advancedStatistics', false,
            'calendarIntegration', false,
            'distractionBlocking', false,
            'prioritySupport', false,
            'ssoIntegration', false,
            'adminDashboard', false
        );
    END IF;
    
    -- Extract feature value
    feature_value := (user_features->feature_name)::BOOLEAN;
    
    RETURN COALESCE(feature_value, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get daily focus session count
CREATE OR REPLACE FUNCTION public.get_daily_focus_session_count(user_id_param UUID DEFAULT auth.uid(), check_date DATE DEFAULT CURRENT_DATE)
RETURNS INTEGER AS $$
DECLARE
    session_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO session_count
    FROM public.focus_blocks
    WHERE user_id = user_id_param
    AND DATE(created_at) = check_date
    AND status = 'completed';
    
    RETURN COALESCE(session_count, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user can start new focus session
CREATE OR REPLACE FUNCTION public.can_start_focus_session(user_id_param UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
DECLARE
    max_sessions INTEGER;
    current_sessions INTEGER;
    user_features JSONB;
BEGIN
    -- Get user features
    SELECT features INTO user_features
    FROM public.subscription_features
    WHERE user_id = user_id_param;
    
    -- If no subscription found, default to free plan limits
    IF user_features IS NULL THEN
        max_sessions := 5;
    ELSE
        max_sessions := (user_features->>'maxFocusSessions')::INTEGER;
    END IF;
    
    -- If unlimited sessions (-1), always allow
    IF max_sessions = -1 THEN
        RETURN TRUE;
    END IF;
    
    -- Check current daily sessions
    current_sessions := public.get_daily_focus_session_count(user_id_param);
    
    RETURN current_sessions < max_sessions;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS policies for admin access
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        is_admin = TRUE OR id = auth.uid()
    );

CREATE POLICY "Admins can view all subscriptions" ON public.subscriptions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = TRUE
        )
        OR user_id = auth.uid()
    );

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.add_admin(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_feature_access(TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_daily_focus_session_count(UUID, DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_start_focus_session(UUID) TO authenticated;
GRANT SELECT ON public.subscription_features TO authenticated;