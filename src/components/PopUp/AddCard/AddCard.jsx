import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import {addCard} from '../../../redux/cards/cardsOpeartions';
import { formattedDateForBtn } from '../../../services/formatingDate';
import Calendar from '../Calendar/Calendar.jsx';
import 'react-datepicker/dist/react-datepicker.css';
import '../Calendar/calendar.css';


import CloseButton from '../CloseButton/CloseButton.jsx';
import ButtonModal from '../ButtonModal/ButtonModal.jsx';
import { closeModal } from '../../../redux/modal/modalSlice';

import {
  AddCardModal,
  Title,
  InputTitle,
  InputDescription,
  StyledPriority,
  StyledLabelDeadline,
  StyleErrorMessage,
  Span,
  LabelContainer,
  ButtonDate,
  CalendarContainer,
  LabelDiv,
  ChevronDown,
  BtnName,
} from './AddCard.styled.js';

const ModalAddCard = ({ boardName, columnId }) => {
 
  const [date, setDate] = useState(new Date());
  const [select, setSelect] = useState('without');
  const [formattedDate, setFormattedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const boardId = useParams(); 

  const dispatch = useDispatch();

  const priorityValue = ['low', 'medium', 'high', 'without'];

  useEffect(() => {
    setFormattedDate(formattedDateForBtn(date));
  }, [date]);

  const initialValues = {
    title: '',
    description: '44444',
    priority: 'without',
    deadline: date.toISOString(),
  };

  const schema = yup.object({
    title: yup
      .string()
      .min(2, 'Too Short!')
      .max(30, 'Maximum 30 characters')
      .matches(
        /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ0-9.%+\-_]*( [a-zA-Zа-яА-ЯёЁ0-9.%+\-_]+)*$/,
        'Invalid name format'
      )
      .required('title is required!'),
    description: yup.string().required('Description is required'),
    priority: yup
      .string()
      .required('Priority is required')
      .oneOf(['low', 'medium', 'high', 'without']),
    deadline: yup.date().required('Deadline is required'),
  });

  const handleSelectChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSelect(value);
  };


  const handleSubmit = async (values) => {

    setIsLoading(true);

    const { title, description, priority, deadline } = values;

    try {

      const response = await dispatch(
        addCard({
          title,
          description,
          priority,
          deadline,
          boardName: boardId.boardId,  
          columnId    
        })
      );

      console.log('Card successfully created:', response);

    } catch (error) {
      console.log('Error creating card:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const hendleSubmitCalendar = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <AddCardModal>
      <CloseButton onClick={() => dispatch(closeModal())} />
      <Title>Add card</Title>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
        autoComplete="off"
      >
        {({ setFieldValue }) => (
          <Form>
            <InputTitle
              id="title"
              name="title"
              type="text"
              placeholder="Title"
            />
            <StyleErrorMessage name="title" component="div" />
            <InputDescription
              as="textarea"
              id="description"
              name="description"
              type="text"
              onChange={(event) =>
                setFieldValue('description', event.target.value)
              }
              placeholder="Description"
            />
            <StyleErrorMessage name="description" component="div" />
            <LabelDiv>
              <StyledPriority id="priority">Label color</StyledPriority>
              <LabelContainer role="group" aria-labelledby="my-radio-group">
                {priorityValue.map((value) => {
                  return (
                    <label htmlFor={value} key={value}>
                      <input
                        value={value}
                        type="radio"
                        id={value}
                        name="priority"
                        onChange={(event) => {
                          handleSelectChange(event);
                          setFieldValue('priority', event.target.value);
                        }}
                        checked={select === value}
                      />
                      <Span value={value} />
                    </label>
                  );
                })}
              </LabelContainer>
              <StyleErrorMessage name="priority" component="div" />
            </LabelDiv>
            <StyledLabelDeadline> Deadline</StyledLabelDeadline>
            <CalendarContainer>
              <ButtonDate type="button">
                <BtnName>
                  {formattedDate}
                  <ChevronDown />
                </BtnName>
              </ButtonDate>
              <Calendar
                prop={date}
                click={hendleSubmitCalendar}
                setFieldValue={setFieldValue}
              />
              <StyleErrorMessage name="deadline" component="div" />
            </CalendarContainer>
            <ButtonModal buttonName={'Add'} isLoading={isLoading} />
          </Form>
        )}
      </Formik>
    </AddCardModal>
  );
};

export default ModalAddCard;

