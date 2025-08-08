import StudentCourseProgress from '@/Components/StudentCourseProgress';
import { Link } from '@inertiajs/react';
import { FaBook } from 'react-icons/fa';

export default function CourseDescription(props) {
    let progressComponent = ''
    if (props.showProgress) {
        progressComponent = <StudentCourseProgress progress={ props.progress } courseId={ props.course.id }/>
    }
    return (
        <div className="py-4" >
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <div className="flex">
                        <div className="mx-1 underline underline-offset-4 text-2xl">
                            <a href={`/course/${ props.course.id }`}>
                                { props.course.name }
                            </a>
                        </div>
                        { progressComponent }
                        <Link href={`/course/${ props.course.id }`} className="pt-2"><FaBook title="ir al curso"/></Link>
                    </div>
                    <div className="m-1 ">
                        { props.course.description }
                    </div>
                </div>
            </div>
        </div>
    );
}
