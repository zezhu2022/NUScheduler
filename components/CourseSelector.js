import React, { useState, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import Course from './Course';
import {getCourseNumber, getCourseTerm, hasConflict, terms} from '../utils/course';

const CourseSelector = ({courses, view}) => {
    const [selected, setSelected] = useState([]);
    
    const toggle = course => setSelected( selected => (
        selected.includes(course) ? selected.filter(x => x !== course) : [...selected, course]
    ));
    return (
      <View style={styles.courseList}>
        { 
          courses.map(course => (
            <Course key={course.id} course={course} view={view}
                isDisabled={hasConflict(course, selected)}
                isSelected={selected.includes(course)}
                select={toggle} 
            />
          ))
        }
      </View>
    );
  };

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
export default CourseSelector;