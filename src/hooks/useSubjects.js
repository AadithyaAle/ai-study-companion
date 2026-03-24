import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { v4 as uuidv4 } from 'uuid';

export const useSubjects = () => {
  const { subjects, setSubjects, topics, setTopics } = useContext(StudyContext);

  // Add a new Subject
  const addSubject = (subjectData) => {
    const newSubject = { ...subjectData, id: uuidv4() };
    setSubjects((prev) => [...prev, newSubject]);
  };

  // Add a new Topic under a specific Subject
  const addTopic = (topicData) => {
    const newTopic = {
      ...topicData,
      id: uuidv4(),
      status: 'Not Started'
    };
    setTopics((prev) => [...prev, newTopic]);
  };

  // Update a Topic's status (e.g., Needs Revision)
  const updateTopicStatus = (topicId, newStatus) => {
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === topicId ? { ...topic, status: newStatus } : topic
      )
    );
  };

  return { subjects, topics, addSubject, addTopic, updateTopicStatus };
};