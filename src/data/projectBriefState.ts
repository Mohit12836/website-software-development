export interface ProjectBrief {
  id: string;
  // Step 1: Goal
  goal: string; // 'new_website' | 'redesign' | 'custom_app' | 'automation' | 'undecided'
  goalTitle: string;
  
  // Step 2: Industry
  industryId: string; // e.g. 'restaurant', 'clinic', 'retail', 'services', 'other', ''
  industryName: string;
  customIndustryName?: string;
  
  // Step 3: Current State
  hasExistingSite: 'yes' | 'no' | 'in_progress' | 'undecided';
  existingSiteUrl?: string;
  mainPainPoints: string[];
  
  // Step 4: Specific Features
  essentialFeatures: string[];
  optionalFeatures: string[];
  
  // Step 5: Scope & Delivery
  indicativeBudget: string;
  estimatedTimeline: string;
  targetAudience: string;
  designPreference: string;
  
  // Step 6: Client Contact
  clientName: string;
  clientContact: string; // phone or email
  clientEmail?: string;
  clientPhone?: string;
  preferredContactMethod: 'email' | 'phone' | 'either';
  additionalNotes?: string;
  
  // Status tracking
  isComplete: boolean;
  serverConfirmed: boolean;
  referenceId?: string;
  submittedAt?: string;
}

export const INITIAL_PROJECT_BRIEF: ProjectBrief = {
  id: '',
  goal: '',
  goalTitle: '',
  industryId: '',
  industryName: '',
  customIndustryName: '',
  hasExistingSite: 'undecided',
  existingSiteUrl: '',
  mainPainPoints: [],
  essentialFeatures: [],
  optionalFeatures: [],
  indicativeBudget: '',
  estimatedTimeline: 'Standard 2–3 Weeks',
  targetAudience: 'Local / Regional customers',
  designPreference: 'Clean Modern High-Conversion',
  clientName: '',
  clientContact: '',
  clientEmail: '',
  clientPhone: '',
  preferredContactMethod: 'email',
  additionalNotes: '',
  isComplete: false,
  serverConfirmed: false
};
