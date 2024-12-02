import React, {useEffect, useState} from 'react'
import "../../../Styles/Survey.css"
import { useNavigate } from 'react-router-dom';

import {
    SurveyTextInput, 
    SurveyRadioInput,
    SurveySelectInput,

} from './inputs'

import {verifyTextInputType} from './validators'



export const Survey = (props) => {
    const [page, setPage] = useState(1)
    const [isFinalPage, setIsFinalPage] = useState(false)
    const [surveyValues, setSurveyValues] = useState({})
    const [loadedInputs, setLoadedInputs] = useState([])
    const navigate = useNavigate();

    const {surveyId} = props

    useEffect(()=>{
        if (surveyId){
            // check it's a file
            const inputDataFile = import(`../data/survey_${surveyId}.json`)
            // http request
            inputDataFile.then(response=>{
                setLoadedInputs(response.default)
                // set the new inputs list data
            })

        }

    })

    const triggerBackendUpdate = () => {
        console.log(surveyValues)
        //alert("Thank you")
        // assume backend updated
        navigate('/');
        // setPage(1)
        // setSurveyValues({})
        // setIsFinalPage(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.persist()
        for (let formInput of event.target.elements){
            const verifyType = verifyTextInputType(formInput.type)
            if (verifyType) {
                surveyValues[formInput.name] = formInput.value
            }

            if (formInput.type === 'select-one') {
                surveyValues[formInput.name] = formInput.value
            }

            if (formInput.type === 'select-multiple') {
                const selected = [].filter.call(formInput.options, option=>option.selected)
                const values = selected.map(option => option.value)
                surveyValues[formInput.name] = values
            }

            if (formInput.checked) {
                surveyValues[formInput.name] = formInput.value
            }

        }
        setSurveyValues(surveyValues)
        const nextPage = page + 1
        const inputs = loadedInputs ? loadedInputs.filter(inputOption => inputOption.page === nextPage) : []
       

        if (isFinalPage) {
            triggerBackendUpdate()
        } else {
            if (inputs.length === 0) {
                setIsFinalPage(true)
            } else {
                setPage(nextPage)
            }
        }


    }
    const inputs = loadedInputs ? loadedInputs.filter(inputOption => inputOption.page === page) : []
    return (
        <div className="survey-container">
          <div className="survey-introduction">
          <div class="logo-container">
            <h2 className="survey-title" id ="page-logo">EduCare</h2>
          </div>
            <p className="survey-description">
            Bảng câu hỏi sức khỏe bệnh nhân (PHQ-9)
            </p>
            <h3 className='survey-title_sub'>Trong 2 tuần qua</h3>
            <p className="survey-description">
            Bạn có thường xuyên cảm thấy khó chịu do những vấn đề sau đây không?
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {isFinalPage !== true &&
              inputs.map((obj, index) => {
                const className = 'form-control mb-2 animated fadeIn';
                const inputKey = `input-${index}-${page}`;
                return obj.type === 'radio' || obj.type === 'checkbox' ? (
                  <SurveyRadioInput
                    object={obj}
                    key={inputKey}
                    className={className}
                    {...obj}
                  />
                ) : obj.type === 'select' ? (
                  <SurveySelectInput
                    className={className}
                    object={obj}
                    key={inputKey}
                    {...obj}
                  />
                ) : (
                  <SurveyTextInput
                    className={className}
                    key={inputKey}
                    {...obj}
                  />
                );
              })}
            {isFinalPage === true && (
              <p className="final-message">Are you finished?</p>
            )}
            <div className="button-container">
              {isFinalPage ? (
                <button
                  className="btn btn-primary save-btn"
                  name="save_btn"
                  type="submit"
                >
                  Save
                </button>
              ) : (
                <><button
                  className="btn btn-secondary present-btn"
                  name="present_btn"
                  type="submit"
                >
                  Present
                </button><button
                  className="btn btn-secondary continue-btn"
                  name="continue_btn"
                  type="submit"
                >
                    Continue
                  </button></>
                
              )}
            </div>
          </form>
        </div>
      );    
}
