import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseComponent from '@/Components/CourseComponent';
import PrimaryButton from '@/Components/PrimaryButton';
import { router, Link, Head } from '@inertiajs/react';

const Enroll = ({ auth, course }) => {

    const title = 'Courses'

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            <div className="flex flex-col text-center">
                <CourseComponent course={ course } showProgress={ false } />
                <div className="py-2" >
                    <div className="mx-auto max-w-lg space-y-1 sm:px-2 lg:px-4">
                        <a href={`/enroll-action/${ course.id }`}>
                            <div className="bg-green-400 px-4 shadow sm:rounded-lg sm:px-4 sm:py-2">
                                ENROLL
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Enroll;
