import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseComponent from '@/Components/CourseComponent';
import TopMenu from '@/Components/TopMenu';
import { router, Link, Head } from '@inertiajs/react';

const Groups = ({ auth, course, groups }) => {

    const title = 'Grupos'

    let topMenu = (
        <TopMenu auth={auth} title={ title } courseId={ course.id } show={['home', 'add-group']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            {groups.map ((gp, k) => {
                return (
                    <div key={ k }>
                        { gp.name }
                    </div>
                )
            })}
        </AuthenticatedLayout>
    )
}

export default Groups;
