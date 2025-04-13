import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseDescription from '@/Components/CourseDescription';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, courses, myProgress }) => {

    const title = 'Courses'
    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            {courses.map ((course, k) => {
                return (
                    <CourseDescription key={ k } course={ course } progress={ myProgress[course.id] }/>
                )
            })}
        </AuthenticatedLayout>
    )
}

export default Index;
