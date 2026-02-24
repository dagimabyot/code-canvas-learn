// Mock Supabase client for local development
// For production, replace this with actual Supabase integration
export const supabase = {
  auth: {
    signUp: async (credentials: any) => {
      console.log('Mock signup:', credentials);
      return { data: { user: credentials }, error: null };
    },
    signIn: async (credentials: any) => {
      console.log('Mock signin:', credentials);
      return { data: { user: credentials }, error: null };
    },
    signOut: async () => {
      console.log('Mock signout');
      return { error: null };
    },
    getSession: async () => {
      return { data: { session: null }, error: null };
    },
    onAuthStateChange: (callback: any) => {
      return { data: { subscription: null }, unsubscribe: () => {} };
    },
  },
  from: (table: string) => ({
    select: () => ({ data: [], error: null }),
    insert: (data: any) => ({ data, error: null }),
    update: (data: any) => ({ data, error: null }),
    delete: () => ({ data: null, error: null }),
  }),
};
