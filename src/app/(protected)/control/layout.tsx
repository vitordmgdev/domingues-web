'use server';

import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ControlSidebar } from './components/layout/control-sidebar';

const ControlLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return redirect('/');
    }

    return (
        <ControlSidebar>
            <Toaster position="top-center" />
            {children}
        </ControlSidebar>
    );
};

export default ControlLayout;
