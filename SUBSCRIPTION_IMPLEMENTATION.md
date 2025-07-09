# Subscription & Access Control Implementatie

Deze documentatie beschrijft de geïmplementeerde functionaliteit voor abonnementen en toegangscontrole in de productivity-app.

## Overzicht

Het systeem ondersteunt drie abonnementsvormen met verschillende functies en beperkingen:

### 📋 Abonnements-types

#### 1. **Free Plan** (`plan = "free"`)
- ✅ Tot 5 focus-sessies per dag
- ✅ Basisstatistieken
- ✅ Eenvoudige timer
- ✅ E-mailondersteuning

#### 2. **Pro Plan** (`plan = "pro"`)
- ✅ Onbeperkte focus-sessies
- ✅ AI-productiviteitscoach
- ✅ Geavanceerde statistieken
- ✅ Agenda-integratie
- ✅ Afleidingsblokkering
- ✅ Prioritaire support

#### 3. **Team Plan** (`plan = "team"`)
- ✅ Alles in Pro
- ✅ Team samenwerking
- ✅ Gedeelde statistieken
- ✅ Admin dashboard
- ✅ SSO-integratie
- ✅ Toegewijde ondersteuning

## 🗄️ Database Structuur

### Nieuwe Tabellen & Kolommen

```sql
-- Subscriptions tabel (bestaand, uitgebreid)
ALTER TABLE subscriptions ADD COLUMN tier subscription_tier DEFAULT 'free';

-- Profiles tabel (uitgebreid)
ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
```

### Database Views

```sql
-- Subscription features view
CREATE VIEW subscription_features AS 
SELECT user_id, tier, status, features FROM subscriptions...
```

### Database Functions

- `has_feature_access(feature_name, user_id)` - Controleert feature toegang
- `can_start_focus_session(user_id)` - Controleert dagelijkse sessielimiet
- `get_daily_focus_session_count(user_id)` - Haalt aantal dagelijkse sessies op
- `add_admin(target_email)` - Maakt gebruiker admin (alleen voor admins)

## 🔧 Services & Components

### 1. SubscriptionService (`src/services/subscriptionService.ts`)

Centrale service voor subscription management:

```typescript
// Feature toegang controleren
const hasAccess = await subscriptionService.hasAccessTo('aiCoaching', user);

// Plan type controleren
const isProUser = await subscriptionService.isProUser(user);
const isTeamUser = await subscriptionService.isTeamUser(user);

// Admin status controleren
const isAdmin = await subscriptionService.isAdmin(user);

// Focus sessie limits
const canStart = await subscriptionService.canStartFocusSession(userId);
const dailyCount = await subscriptionService.getDailyFocusSessionCount(userId);

// Admin functionaliteit
await subscriptionService.addAdmin('user@example.com');
```

### 2. AccessControl Component (`src/components/auth/AccessControl.tsx`)

HOC voor component-level toegangscontrole:

```typescript
// Feature-based access control
<AccessControl requireFeature="aiCoaching">
  <AiCoachComponent />
</AccessControl>

// Plan-based access control
<AccessControl requirePlan="pro">
  <AdvancedStatsComponent />
</AccessControl>

// Admin-only access
<AccessControl requireAdmin={true}>
  <AdminDashboard />
</AccessControl>

// Met fallback
<AccessControl 
  requireFeature="teamCollaboration" 
  fallback={<UpgradePrompt />}
>
  <TeamFeatures />
</AccessControl>
```

### 3. withAccessControl HOC

Voor component wrapping:

```typescript
const ProtectedComponent = withAccessControl(MyComponent, {
  requirePlan: 'pro',
  requireFeature: 'advancedStatistics'
});
```

### 4. useAccessControl Hook

Utility hook voor programmatische checks:

```typescript
const { 
  checkFeatureAccess, 
  checkPlanAccess, 
  checkAdminAccess,
  isProUser,
  isTeamUser 
} = useAccessControl();

const hasAiAccess = await checkFeatureAccess('aiCoaching');
```

### 5. AdminDashboard Component (`src/components/admin/AdminDashboard.tsx`)

Volledig admin dashboard met:
- 📊 Gebruikers statistieken
- 👥 Gebruikers overzicht met subscription status
- 🛡️ Admin management functies
- 💰 Revenue tracking (geschat)
- 📈 Conversion rate metrics

## 🔐 Admin Systeem

### Automatische Admin Assignment

Het e-mailadres `djuliusvdijk@protonmail.com` wordt automatisch admin bij eerste login:

```sql
-- Trigger functie
CREATE FUNCTION handle_new_user_admin()
-- Automatisch admin maken voor specifiek e-mailadres
```

### Admin Functies

```typescript
// Admin toevoegen (alleen door bestaande admins)
await subscriptionService.addAdmin('new-admin@example.com');

// Admin dashboard toegang
<Route path="/admin" element={
  <AccessControl requireAdmin={true}>
    <AdminDashboard />
  </AccessControl>
} />
```

## 🎯 Implementatie Voorbeelden

### 1. Focus Mode met Limits

De `FocusMode` component toont subscription limits:

```typescript
// Dagelijkse limiet check
const canStart = await subscriptionService.canStartFocusSession(user.id);
const dailyCount = await subscriptionService.getDailyFocusSessionCount(user.id);

// UI feedback
{dailySessionsUsed >= maxDailySessions ? (
  "Je hebt je dagelijkse limiet bereikt. Upgrade naar Pro."
) : (
  `Je hebt ${dailySessionsUsed} van ${maxDailySessions} sessies gebruikt.`
)}
```

### 2. Route Protection

```typescript
// Admin-only route
<Route path="/admin" element={<AdminPage />} />

// Component met AccessControl
const AdminPage = () => (
  <AccessControl requireAdmin={true}>
    <AdminDashboard />
  </AccessControl>
);
```

### 3. Feature Flags

```typescript
// Conditionele feature rendering
const hasAiCoaching = await subscriptionService.hasAccessTo('aiCoaching', user);

{hasAiCoaching && <AiCoachingButton />}
```

## 🚀 Gebruik van het Systeem

### Voor Developers

1. **Feature Gate maken:**
```typescript
<AccessControl requireFeature="newFeature">
  <NewFeatureComponent />
</AccessControl>
```

2. **Plan requirement toevoegen:**
```typescript
<AccessControl requirePlan="team">
  <TeamOnlyFeature />
</AccessControl>
```

3. **Programmatische check:**
```typescript
const canUse = await subscriptionService.hasAccessTo('feature', user);
if (canUse) {
  // Enable feature
}
```

### Voor Admins

1. **Admin dashboard:** Navigeer naar `/admin`
2. **Gebruikers beheren:** Bekijk subscription status, voeg admins toe
3. **Statistieken:** Monitor conversions en gebruik

## 🔄 Data Flow

```
User Login → Check Subscription → Load Features → Apply Access Control
     ↓
Database Query → SubscriptionService → AccessControl Component → UI
     ↓
Feature Access → Plan Validation → Render/Block Content
```

## 🛡️ Scheiding van Concerns

- **Database Layer:** Migraties, functies, RLS policies
- **Service Layer:** `SubscriptionService` voor business logic
- **Access Control:** `AccessControl` component en hooks
- **UI Layer:** Components met toegangsbescherming
- **Admin Layer:** `AdminDashboard` voor beheer

## 📈 Volgende Stappen

1. **Paddle Integratie:** Webhook handlers voor subscription updates
2. **Realtime Updates:** WebSocket updates voor plan wijzigingen
3. **Usage Analytics:** Gedetailleerde gebruiksstatistieken
4. **Feature Flags:** Dynamische feature enabling
5. **Audit Logging:** Admin acties bijhouden

## 🔧 Configuratie

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_PADDLE_VENDOR_ID=your_paddle_vendor_id
```

### Database Setup
```bash
# Run migraties
supabase db push

# Seed data (optioneel)
supabase db seed
```

Dit systeem biedt een complete, schaalbare oplossing voor subscription management met duidelijke scheiding van concerns en flexibele toegangscontrole.