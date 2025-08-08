import StudentLessonResults from '@/Components/StudentLessonResults';
import { Link } from '@inertiajs/react';
import { FaGraduationCap } from 'react-icons/fa';
import { BiMath } from 'react-icons/bi';

export default function LessonDescription(props) {
    return (
        <div className="py-2" >
            <div className="mx-auto max-w-7xl space-y-1 sm:px-6 lg:px-8">
                <div className="bg-white px-4 shadow sm:rounded-lg sm:px-8 sm:py-2">
                    <div className="flex">
                        <div className="mx-1 text-xl">
                            <a href={`/lesson/${ props.lesson.id }`}>
                                { props.lesson.name }
                            </a>
                        </div>
                        <StudentLessonResults progress={ props.progress }/>
                        <Link href={`/lesson/${ props.lesson.id }`}><FaGraduationCap title="ir a la lección"/></Link>
                        <Link href={`/problem-set/${ props.lesson.id }`}><BiMath title="ir a los problemas" /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
