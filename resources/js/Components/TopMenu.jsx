import { FaHome, FaGraduationCap  } from 'react-icons/fa';
import { BiMath } from 'react-icons/bi';
import ProblemNav from '@/Components/ProblemNav';
import LessonNav from '@/Components/LessonNav';
import ChapterNav from '@/Components/ChapterNav';

export default function TopMenu(props) {
    let courseListLink = (
        <div className="mx-1" title="home">
            <a href="/courses/all">
                <FaHome />
            </a>
        </div>
    )
    let lessonLink = (
        <div className="mx-1" title="back to lesson">
            <a href={`/lesson/${ props.lessonId }`}>
                <FaGraduationCap />
            </a>
        </div>
    )
    let problemsLink = (
        <div className="mx-1" title="back to problems">
            <a href={`/problem-set/${ props.lessonId }`}>
                <BiMath />
            </a>
        </div>
    )
    let problemNav = (
        <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
            <div className="p-4 text-base sm:rounded-lg sm:p-1">
                <ProblemNav neighbors={ props.neighboringProblems } />
            </div>
        </div>
    )
    let lessonNav = (
        <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
            <div className="p-4 text-base sm:rounded-lg sm:p-1">
                <LessonNav neighbors={ props.neighboringLessons } />
            </div>
        </div>
    )
    let chapterNav = (
        <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
            <div className="p-4 text-base sm:rounded-lg sm:p-1">
                <ChapterNav neighbors={ props.neighboringChapters } />
            </div>
        </div>
    )

    return (
        <div className="flex justify-start w-full">
            <h2>{ props.title }</h2>
            { props.show.indexOf('home') >= 0 && courseListLink }
            { props.show.indexOf('lesson') >= 0 && props.lessonId !== null && lessonLink }
            { props.show.indexOf('prob-set') >= 0 && props.lessonId !== null && problemsLink }
            { props.show.indexOf('prob-nav') >= 0 && props.neighboringProblems !== null  && problemNav }
            { props.show.indexOf('lesson-nav') >= 0 && props.neighboringLessons !== null  && lessonNav }
            { props.show.indexOf('chapter-nav') >= 0 && props.neighboringChapters !== null  && chapterNav }
        </div>
    );
}
 