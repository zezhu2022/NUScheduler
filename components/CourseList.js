import React, { useState, useEffect } from 'react';
import CourseSelector from './CourseSelector'
import { StyleSheet, ScrollView, View} from 'react-native';
import TermSelector from './TermSelector'


const CourseList = ({courses, view}) => {
    const [selectedTerm, setSelectedTerm] = useState('Fall');
  
    const termCourses = courses.filter(course => selectedTerm === getCourseTerm(course));
    
    return (
      <ScrollView>
        <View style ={styles.container}>
            <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
            <View style={styles.courseList}>
                <CourseSelector courses={termCourses} view={view} />
            </View>
        </View>
      </ScrollView>
    );
  };

const termMap = { F: 'Fall', W: 'Winter', S: 'Spring'};
const terms = Object.values(termMap);
const getCourseTerm = course => (
    termMap[course.id.charAt(0)]
);

const styles = StyleSheet.create({
    courseList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        },
    container: {
        alignItems: 'center'
    }
});


  export default CourseList;