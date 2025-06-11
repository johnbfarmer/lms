import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseComponent from '@/Components/CourseComponent';
import TopMenu from '@/Components/TopMenu';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, courses, myProgress }) => {

    const title = 'Cursos'

    let topMenu = (
        <TopMenu auth={auth} title={ title } show={['home', 'course-add']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
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
