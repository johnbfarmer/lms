import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout header='Inicio'>
            <Head title="Inicio" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Para empezar, navega a la lista de cursos y selecciona uno...
                            <a href='/courses/all'>ver la lista de cursos...</a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
