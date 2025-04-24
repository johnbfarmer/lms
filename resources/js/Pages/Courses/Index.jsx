import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseComponent from '@/Components/CourseComponent';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, courses, myProgress }) => {

    const title = 'Courses'
    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            {courses.map ((course, k) => {
                let progress = myProgress !== null && (course.id in myProgress) ? myProgress[course.id] : null
                return (
                    <CourseComponent key={ k } course={ course } progress={ progress }  showProgress={ true } />
                )
            })}
        </AuthenticatedLayout>
    )
}

export default Index;
