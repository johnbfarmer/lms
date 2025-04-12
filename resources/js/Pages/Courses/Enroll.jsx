import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseDescription from '@/Components/CourseDescription';
import { router, Link, Head } from '@inertiajs/react';

const Enroll = ({ auth, course }) => {

    const title = 'Courses'

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            <CourseDescription course={ course } />
        </AuthenticatedLayout>
    )
}

export default Enroll;
