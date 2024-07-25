import { createBrowserClient } from '@supabase/ssr'

import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from './constants'

export const supabaseBrowserClient = createBrowserClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  db: {
    schema: 'public'
  }
})