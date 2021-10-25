// @flow strict
import React, { useState, useEffect } from 'react'
import {saveAs} from 'file-saver'
import { Form, Button, Row, Col, Table,Card,Container, ListGroup ,Image} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
//import  {useFlutterwave, FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Link } from 'react-router-dom'
import { PaystackButton } from 'react-paystack';
import { purchaseTemplate,payTemplate } from '../Actions/templateAction'
//import Pay from '../Components/paystackButton'
import { PAY_TEMPLATE_RESET } from '../Constants/templateConstant'
import axios from 'axios'


var filedownload = require('js-file-download')
function PaymentsScreen({match,history}) {
    const templateId = match.params.id 
    const [sdk, setSdk] = useState(false)


    

    const dispatch= useDispatch()

    const templatepurchase = useSelector(state => state.templatePurchase)
    const {loading, error, templatePurchase} = templatepurchase

    const templatePay = useSelector(state => state.templatePay)
    const {loading:payLoading, error:payError,success:successPay} = templatePay

    const userLogin = useSelector(state => state.userLogin )
    const {userInfo} = userLogin
    
    const purchasedTemplate = useSelector(state => state.purchasedTemplate)
    const {loading:loadingPuchase, error:errorPurchase,  success:purSuccesss} = purchasedTemplate

   // const Templatedownload = useSelector(state => state.Templatedownload)
   // const {loading:downloadLoading, error:downloadERROR, templateDownload} = Templatedownload

   
    
    
    useEffect(()=>{
        dispatch({type:PAY_TEMPLATE_RESET})
     
       if(successPay ){
        dispatch({type:PAY_TEMPLATE_RESET})
         history.push(`/download/${match.params.id}`)
          

       }
        if(!userInfo){
           history.push('/login')
        }
        if(templateId){
            dispatch(purchaseTemplate(templateId))
            
            
        }
      console.log(successPay)
    },[dispatch,templateId,userInfo,successPay])

   

   
    
     

    const paymentSuccessHandler = ()=>{
       dispatch(payTemplate(templatePurchase))
       //history.push(`/download/${match.params.id}`)
        //dispatch(payTemplate(templateId,paymentResult))
        saveAs(
            `${templatePurchase.templatefile}`,
            `${templatePurchase.templatefile}`
        )
    }

    const handledownload = (id)=>{
        //dispatch(downloadTemplate(match.params.id))
        axios.get(`${templatePurchase.templatefile}`,{
            responseType:  'blob',

        }).then(res => {filedownload(res.data, `${templatePurchase.templatefile}`);
    console.log(res);}).catch(err=>{
        console.log(err);
    })
    }

      
 
    const config = {
        reference: (new Date()).getTime().toString(),
        email: "gm@gmail.com",
        amount: `${templatePurchase.price}`,
        publicKey: 'pk_test_d2c93ba373fc7748f437a9d7d98ca1e6f4538ef2',
      };

     // you can call this function anything
     const handlePaystackSuccessAction = (reference,paymentResult) => {
        // Implementation for whatever you want to do with reference and after success call.
        //paymentSuccessHandler
        
        
        dispatch(payTemplate(templateId,paymentResult))
        //history.push(`/download/${match.params.id}`)

        console.log(reference);
      };
  
      // you can call this function anything
      const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
      }
  
      const componentProps = {
          ...config,
          text: 'pay Now',
          onSuccess: (reference) => handlePaystackSuccessAction(reference),
          onClose: handlePaystackCloseAction,
      };

   
    
    return (
        <div>
            
            
            <Row>
                <h2>Payment confirmation</h2>
            
                <Col md={8}>
                <ListGroup variant=
                'flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col   >
                                <Image src={templatePurchase.thumbnail} alt={templatePurchase.tittle} fluid rounded/>
                                
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Name </Col>
                            <Col>{templatePurchase.title}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price</Col>
                            <Col>{templatePurchase.price}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        
                  
                        <Row>
                          
                      
                       <Button onClick={paymentSuccessHandler,handledownload }>Pay Now texting button</Button>
                          
                      
                            
                        </Row>
                       
                    </ListGroup.Item>


                </ListGroup>

                
                
                </Col>
            </Row>
            
        </div>
    );
};

export default PaymentsScreen;