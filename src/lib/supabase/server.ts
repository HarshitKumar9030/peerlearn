import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/database.types';
import jwt from 'jsonwebtoken';

export const createClient = (supabaseId: string) => {
  const cookieStore = cookies();

  if (!supabaseId) {
    throw new Error('Supabase ID is required to create the Supabase client.');
  }

  const token = jwt.sign(
    { sub: supabaseId }, // Sign the Supabase ID
    process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET!
  );

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
};
