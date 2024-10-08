import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useCreateBoardMutation } from '../../../redux/boardApi/boardApi';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/modal/modalSlice';
import  Loader  from '../../Loader/Loader';
import { useGetMiniImgQuery } from '../../../redux/miniImgApi/miniImgApi';
import urlIcon from '../../../images/icons/sprite.svg';
import icons from '../icons.json';
import { createNewBoard } from '../../../redux/board/boardOperations';
//import Notiflix from 'notiflix';

import CloseButton from '../CloseButton/CloseButton';
import {
  ModalCard,
  Title,
  ErrorMessage,
  FormikForm,
  FormFieldTitle,
  FieldTitle,
  Text,
  IconContainer,
  ImageContainer,
  FormikField,
  FormikFieldImage,
  Button,
  ContainerIconButton,
  Icon,
  ImgStyled,
  ImgBox,
} from './ModalCreateNewBoard.styled';

const ModalCreateNewBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetMiniImgQuery();
 // console.log({data});

  const [{ isLoading: isCreateBoard }] = useCreateBoardMutation();
  
  const handleSubmit = async (values) => {
    
    try{
    const response = await dispatch(createNewBoard(values));
    
    
        navigate(`/boards/${values?.name}`, { replace: true });
        dispatch(closeModal());
      return response;
   // console.log(values); //response.name
    //console.log(response); //createNewBoard.payload.name.match(response)
   // console.log(values.name); //name
   // console.log(response.payload.name)
  }catch (error) {
    console.log(error)
  }
  };

  return (
    <>
      <ModalCard>
        <CloseButton />
        <Title>New board</Title>

        <Formik
          initialValues={{
            name: '',
           
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <FormikForm>
            <FormFieldTitle>
              <FieldTitle
                type="text"
                name="name"
                title="You need to enter the name of the column"
                required
                placeholder="Title"
              />
              <ErrorMessage name="name" component="p" />
            </FormFieldTitle>

            <Text id="my-radio-groupIcon">Icons</Text>
            <IconContainer role="group" aria-labelledby="my-radio-groupIcon">
              {icons.map(({ id, path }) => (
                <label key={id}>
                  <FormikField type="radio" value={id} name="icon" />
                  <Icon width="18" height="18">
                    <use xlinkHref={`${urlIcon}${path}`} />
                  </Icon>
                </label>
              ))}
              <ErrorMessage name="icon" component="p" />
            </IconContainer>

            <Text id="my-radio-groupImage">Background</Text>
            <ImageContainer role="group" aria-labelledby="my-radio-groupImage">
              <label>
                <FormikFieldImage
                  type="radio"
                  name="backgroundImage"
                  value="default"
                />
                <ImgBox>
                  <svg width="16" height="16" stroke="var(--iconImageColor)">
                    <use xlinkHref={`${urlIcon}#icon-image-default`} />
                  </svg>
                </ImgBox>
              </label>
              {Array.isArray(data) && data.map(({ _id, name, image }) => (
                <label key={_id}>
                  <FormikFieldImage
                    type="radio"
                    name="backgroundId"
                    value={name}
                  />
                  <ImgBox>
                    <ImgStyled width={28} src={image.retina} alt={name} />
                  </ImgBox>
                </label>
              ))}
              <ErrorMessage name="backgroundImage" component="p" />
            </ImageContainer>

            <Button type="submit" disabled={isCreateBoard}>
              <ContainerIconButton>
                <svg width="14" height="14">
                  <use xlinkHref={`${urlIcon}#icon-plus`} />
                </svg>
              </ContainerIconButton>
              {isCreateBoard ? <Loader /> : 'Create'}
            </Button>
          </FormikForm>
        </Formik>
      </ModalCard>
    </>
  );
};

const schema = yup.object({
  name: yup
    .string()
    .min(2, 'Too Short!')
    .max(30, 'Maximum 30 characters')
    .matches(
      /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ0-9.%+\-_]*( [a-zA-Zа-яА-ЯёЁ0-9.%+\-_]+)*$/,
      'Invalid name format'
    )
    .required('title is required!'), 
  
});

export default ModalCreateNewBoard;
