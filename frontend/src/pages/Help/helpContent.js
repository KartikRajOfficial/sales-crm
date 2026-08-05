/**
 * helpContent — the in-app guide, grounded in the real backend behaviour.
 *
 * Each section: { id, icon, title, summary, keywords, blocks[] }.
 * Block types the renderer understands:
 *   - { type: 'text',  title?, body }
 *   - { type: 'steps', title?, steps: [] }
 *   - { type: 'fields', title?, fields: [{ name, required, desc }] }
 *   - { type: 'note',  tone: 'info'|'warn'|'success', body }
 *   - { type: 'faq',   items: [{ q, a }] }
 */
import {
  Rocket,
  LayoutDashboard,
  Users,
  Building2,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react';

export const helpSections = [
  {
    id: 'getting-started',
    icon: Rocket,
    title: 'Getting Started',
    summary: 'Create an account, sign in, and find your way around NexusCRM.',
    keywords: 'signup register login account role admin sales session logout jwt token',
    blocks: [
      {
        type: 'text',
        body:
          'NexusCRM helps you move deals from first contact to closed-won. You capture prospects as Leads, promote the real accounts to Customers, then track the deals themselves as Opportunities. The Dashboard ties it all together with live totals and charts.',
      },
      {
        type: 'steps',
        title: 'Create your account',
        steps: [
          'On the sign-in screen, choose "Create one" to open the registration form.',
          'Enter your full name and a valid email address.',
          'Set a password with at least 6 characters.',
          'Pick a role — Sales Representative or Administrator (see Roles & Permissions for the difference).',
          'Submit, then sign in with your new email and password.',
        ],
      },
      {
        type: 'note',
        tone: 'info',
        body:
          'Your session stays active for 7 days. After that — or if you sign out — you\'ll be returned to the sign-in screen and just need to log in again.',
      },
      {
        type: 'steps',
        title: 'Find your way around',
        steps: [
          'Use the left sidebar to move between Dashboard, Leads, Customers and Opportunities.',
          'Collapse the sidebar with the chevron at the bottom to get more room; on mobile, open it from the menu button in the top bar.',
          'Open this guide any time from the Help link in the sidebar or the question-mark icon in the top bar.',
          'Your name, role and Sign out live in the profile menu at the top-right.',
        ],
      },
    ],
  },
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    title: 'Dashboard',
    summary: 'Read your headline numbers and the four charts at a glance.',
    keywords: 'dashboard stats totals pipeline value chart funnel trend overview metrics',
    blocks: [
      {
        type: 'text',
        body:
          'The Dashboard is your daily starting point. It loads four headline stats across the top, then four charts that summarise where your pipeline stands right now. Everything updates from your live records — add a lead or close a deal and the numbers follow.',
      },
      {
        type: 'fields',
        title: 'The four headline stats',
        fields: [
          { name: 'Total Leads', desc: 'Every lead currently in the system, across all statuses.' },
          { name: 'Total Customers', desc: 'The accounts you\'ve promoted from leads to active customers.' },
          { name: 'Opportunities', desc: 'The number of deals being tracked in your pipeline.' },
          { name: 'Pipeline Value', desc: 'The summed dollar value of all opportunities.' },
        ],
      },
      {
        type: 'fields',
        title: 'The four charts',
        fields: [
          { name: 'Monthly Overview', desc: 'New leads and customers per month, so you can see momentum over time.' },
          { name: 'Leads by Status', desc: 'How your leads split across the lifecycle, from New to Won or Lost.' },
          { name: 'Pipeline Stages', desc: 'Opportunity count per stage — where deals are concentrated.' },
          { name: 'Sales Funnel', desc: 'Deals in pipeline order (Prospecting → Won) to reveal drop-off.' },
        ],
      },
      {
        type: 'note',
        tone: 'info',
        body:
          'Charts only show stages or statuses that actually have records, so an empty pipeline shows a friendly placeholder rather than empty axes.',
      },
    ],
  },
  {
    id: 'leads',
    icon: Users,
    title: 'Managing Leads',
    summary: 'Capture prospects, qualify them through statuses, and keep the list tidy.',
    keywords: 'lead create add edit update delete search filter status new contacted qualified proposal won lost pagination',
    blocks: [
      {
        type: 'text',
        body:
          'A lead is a prospect you haven\'t closed yet. The Leads page lists everyone in a paginated table (10 per row page) and lets you create, search, filter, edit and — for admins — delete.',
      },
      {
        type: 'steps',
        title: 'Create a lead',
        steps: [
          'Open Leads from the sidebar and click "Add Lead".',
          'Fill in Company Name and Contact Person — both are required.',
          'Optionally add an email, phone, a starting status and notes.',
          'Click "Create Lead". It appears at the top of the list and a confirmation toast pops up.',
        ],
      },
      {
        type: 'fields',
        title: 'Lead fields',
        fields: [
          { name: 'Company Name', required: true, desc: 'The prospect\'s organisation. Required.' },
          { name: 'Contact Person', required: true, desc: 'Your main point of contact. Required.' },
          { name: 'Email', desc: 'Must be a valid email address if provided.' },
          { name: 'Phone', desc: 'If provided, use 10–15 digits.' },
          { name: 'Status', desc: 'New, Contacted, Qualified, Proposal Sent, Won or Lost. Defaults to New.' },
          { name: 'Notes', desc: 'Free-text context — call summaries, next steps, anything useful.' },
        ],
      },
      {
        type: 'steps',
        title: 'Search, filter and page',
        steps: [
          'Type in the search box to match by company name or contact person — results update as you pause typing.',
          'Use the status dropdown to narrow to a single stage of the lifecycle.',
          'Move between pages with the pager; the summary line shows exactly which records you\'re viewing.',
        ],
      },
      {
        type: 'steps',
        title: 'Edit or delete',
        steps: [
          'Click the pencil icon on any row to edit, then save your changes.',
          'Admins see a red trash icon to delete a lead; a confirmation dialog prevents accidents.',
        ],
      },
      {
        type: 'note',
        tone: 'warn',
        body:
          'Deleting is permanent and admin-only. If you don\'t see a delete icon, your account has the Sales role — ask an administrator to remove records for you.',
      },
    ],
  },
  {
    id: 'customers',
    icon: Building2,
    title: 'Managing Customers',
    summary: 'Keep your active accounts and their key contacts in one place.',
    keywords: 'customer account create add edit update delete search industry company contact pagination',
    blocks: [
      {
        type: 'text',
        body:
          'Customers are your active accounts — typically leads that converted. You\'ll link opportunities to customers, so keeping this list accurate matters. The page mirrors Leads: a paginated table with create, search, edit and admin-only delete.',
      },
      {
        type: 'steps',
        title: 'Create a customer',
        steps: [
          'Open Customers and click "Add Customer".',
          'Enter Company Name and Contact Person — both required.',
          'Optionally add email, phone, industry and notes.',
          'Click "Create Customer" to save.',
        ],
      },
      {
        type: 'fields',
        title: 'Customer fields',
        fields: [
          { name: 'Company Name', required: true, desc: 'The account name. Required.' },
          { name: 'Contact Person', required: true, desc: 'Primary contact at the account. Required.' },
          { name: 'Email', desc: 'Valid email address if provided.' },
          { name: 'Phone', desc: '10–15 digits if provided.' },
          { name: 'Industry', desc: 'Optional tag, e.g. SaaS or Manufacturing — handy for scanning the list.' },
          { name: 'Notes', desc: 'Any account context worth remembering.' },
        ],
      },
      {
        type: 'steps',
        title: 'Search and manage',
        steps: [
          'Search matches company name, contact person or email.',
          'Click the pencil to edit an account.',
          'Admins can delete an account with the trash icon after confirming.',
        ],
      },
      {
        type: 'note',
        tone: 'info',
        body:
          'Add customers before creating opportunities — each opportunity is linked to a customer you pick from a dropdown.',
      },
    ],
  },
  {
    id: 'opportunities',
    icon: TrendingUp,
    title: 'Managing Opportunities',
    summary: 'Track deals by stage and value, from Prospecting through to Won.',
    keywords: 'opportunity deal create add edit delete stage value pipeline filter min max close date prospecting negotiation won lost',
    blocks: [
      {
        type: 'text',
        body:
          'Opportunities are the deals themselves — a named deal, the customer it belongs to, its dollar value and the stage it\'s in. Their combined value is what drives the Pipeline Value on your Dashboard.',
      },
      {
        type: 'note',
        tone: 'warn',
        body:
          'You need at least one customer first. When you add an opportunity you choose its customer from a dropdown, so create the account under Customers before you start.',
      },
      {
        type: 'steps',
        title: 'Create an opportunity',
        steps: [
          'Open Opportunities and click "Add Opportunity".',
          'Give the deal a name and pick the customer it belongs to.',
          'Enter the deal value in dollars (numbers only) and choose a stage.',
          'Optionally set an expected close date and notes, then click "Create Opportunity".',
        ],
      },
      {
        type: 'fields',
        title: 'Opportunity fields',
        fields: [
          { name: 'Deal Name', required: true, desc: 'A short label for the deal. Required.' },
          { name: 'Customer', required: true, desc: 'The account this deal belongs to. Required — chosen from your customers.' },
          { name: 'Value ($)', required: true, desc: 'The deal size as a number. Required, and feeds Pipeline Value.' },
          { name: 'Stage', desc: 'Prospecting, Qualification, Proposal, Negotiation, Won or Lost. Defaults to Prospecting.' },
          { name: 'Expected Close Date', desc: 'Optional target date for closing the deal.' },
          { name: 'Notes', desc: 'Deal context — decision makers, blockers, next steps.' },
        ],
      },
      {
        type: 'steps',
        title: 'Filter by stage and value',
        steps: [
          'Use the stage dropdown to focus on one part of the pipeline.',
          'Set a Min $ and/or Max $ to show only deals within a value band — useful for spotting your biggest deals.',
          'Hit "Clear" to reset every filter at once.',
        ],
      },
      {
        type: 'steps',
        title: 'Edit or delete',
        steps: [
          'Click the pencil to update a deal — move its stage forward as it progresses.',
          'Admins can delete a deal with the trash icon after confirming.',
        ],
      },
    ],
  },
  {
    id: 'roles',
    icon: ShieldCheck,
    title: 'Roles & Permissions',
    summary: 'What Administrators and Sales Representatives can each do.',
    keywords: 'role permission admin sales representative access delete authorize security who can',
    blocks: [
      {
        type: 'text',
        body:
          'Every account is either an Administrator or a Sales Representative, chosen at registration. Both roles can do the day-to-day work; the key difference is deletion.',
      },
      {
        type: 'fields',
        title: 'Administrator',
        fields: [
          { name: 'Create & edit', desc: 'Full access to add and update leads, customers and opportunities.' },
          { name: 'Delete', desc: 'Can permanently delete leads, customers and opportunities.' },
          { name: 'View everything', desc: 'Full access to the dashboard and all lists.' },
        ],
      },
      {
        type: 'fields',
        title: 'Sales Representative',
        fields: [
          { name: 'Create & edit', desc: 'Can add and update leads, customers and opportunities.' },
          { name: 'Delete', desc: 'Not available — delete controls are hidden and blocked on the server.' },
          { name: 'View everything', desc: 'Full access to the dashboard and all lists.' },
        ],
      },
      {
        type: 'note',
        tone: 'success',
        body:
          'Permissions are enforced on the backend, not just hidden in the UI — so the rules hold even outside the app. Need something deleted as a Sales rep? Ask an administrator.',
      },
    ],
  },
  {
    id: 'tips',
    icon: Lightbulb,
    title: 'Tips & FAQ',
    summary: 'Quick answers to the questions that come up most.',
    keywords: 'faq tips help question answer session expired currency date search empty why cannot delete',
    blocks: [
      {
        type: 'faq',
        items: [
          {
            q: 'Why can\'t I delete anything?',
            a: 'Deletion is restricted to Administrators. If your account has the Sales role you can create and edit freely, but delete controls are hidden. Ask an admin to remove records.',
          },
          {
            q: 'I was suddenly sent back to the sign-in screen.',
            a: 'Sessions last 7 days. Once yours expires you\'re returned to sign-in to protect your account — just log in again to pick up where you left off.',
          },
          {
            q: 'My opportunity won\'t save.',
            a: 'A deal needs a name, a linked customer and a numeric value. If the customer dropdown is empty, add a customer first under the Customers page.',
          },
          {
            q: 'Search isn\'t finding my record.',
            a: 'Leads search matches company or contact name; Customers also match email. Opportunities don\'t use text search — filter them by stage and value range instead.',
          },
          {
            q: 'Why is a chart empty?',
            a: 'Charts only render statuses or stages that have records. Add a few leads or deals and the charts fill in automatically.',
          },
        ],
      },
      {
        type: 'note',
        tone: 'info',
        body:
          'A phone number should be 10–15 digits and an email must be properly formatted — otherwise the form will flag it before saving.',
      },
    ],
  },
];
