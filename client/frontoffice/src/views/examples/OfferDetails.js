import React ,{useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Table,Alert,FormGroup,Label,Input,ModalBody, ModalFooter,Modal,ModalHeader,Form,Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from "reactstrap";
import { data,error } from "jquery";
import axios from "axios";
import OfferHeader from "components/Headers/OfferHeader";
import ReactPaginate from "react-paginate";

// Importez votre image statique ici
import offerImage from "../uploads/offers/1681389235310-offers.jpg"
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Swal from "sweetalert2";
import CondidatNavbar from "components/Navbars/CondidatNavbar";

function OfferDetails() {
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const itemsPerPage = 6;
  const token = localStorage.getItem("token");
  const [modalQuizz, setModalQuizz] = useState(false);
  const handleAddQuizClick = (offerId) => {
    console.log("add quiz")
     setModalQuizz(!modalQuizz);

    setSelectedOfferId(offerId);
    setShowQuizForm(true);
};


  const handleViewQuizzesClick = async (offerId) => {
    try {
        const response = await fetch(
            `http://localhost:5000/Candidacy/offer/${offerId}/quizzes`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            }
        );
        const data = await response.json();
        console.log(data);
        setQuizzes(data);
        setShowQuizzes(true);
    } catch (error) {
        console.error(error);
    }
};


const handleViewQuestionsClick = (offerId, quizId) => {
  history.push(`/offres?ido=${offerId}&idq=${quizId}&questions`);
};

const handleQuizFormSubmit = async (e) => {
  e.preventDefault();

  console.log(quizData);
  try {
      const response = await fetch(
          `http://localhost:5000/Quiz/addquiztooffer/${offerId}`,
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(quizData),
              credentials: "include",
          }
      );

      const data = await response.json();
      console.log(data);
      if(response.status==201){
          console.log(data);
          setQuizData({
              name: "",
              coefficient: "",
              timeout: "",
          });
          setShowQuizForm(false);

          alert(data.message);

      }
      else if(response.status==400)
      {
          console.log(data);
          setQuizData({
              name: "",
              coefficient: "",
              timeout: "",
          });
      //    setShowQuizForm(false);

          setAlertMessage(data.error)
setcouleur("danger")
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 6000)
    setShowQuizForm(false);

      }
      // Réinitialiser les valeurs du formulaire

  } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'ajout du quiz.");
  }
};


const handleInputChange = (event) => {
  const { name, value } = event.target;
  setQuizData({ ...quizData, [name]: value });
};











const handlePageClick = ({ selected }) => {
  setCurrentPage(selected);
};

const [currentPage, setCurrentPage] = useState(0);

  
  const idIntern = localStorage.getItem("id");
  const role = localStorage.getItem("role");
   //  const id = localStorage.getItem("id");
 //    console.log(id);
    const { id } = useParams(); // Récupère l'id de l'offre depuis l'URL
    const [index, setIndex] = useState(1); // initialiser à null
    const [quizData, setQuizData] = useState({
      name: "",
      coefficient: "",
      timeout: "",
  });
  const offerId = selectedOfferId;
  const [couleur, setcouleur] = useState("");

    const [offer, setOffers] = useState([]); // initialiser à null
    const [selectedOffer, setSelectedOffer] = useState(null); // Nouvel état
    const [file, setFile] = useState(null);
    const [lettre, setLettre] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showButton, setShowButton] = useState();
    const [isSelected2, setIsSelected2] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const history = useHistory();
    

    const [modalCv, setModalCv] = useState(false);
    const [modal, setModal] = useState(false);
    const openForm = () => setModal(!modal);
    const openFormCv = () => setModalCv(!modalCv);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedEducation, setSelectedEducation] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState([]);
    const [description, setDescription] = useState('');
    const [showBoolean, setShowBoolean] = useState();
    const [userd, setUserData] = useState({});
    const [category, setCategory] = useState({});

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  console.log(offer);
    React.useEffect(() => {
    
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:5000/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
          ,credentials: 'include'
        })
          .then(response => response.json())
          .then(async (data) => {
            const userData = data.user;
            setUserData(userData);
            const id=id;
          
            const checkOffer = async () => {
              const response = await fetch(`http://localhost:5000/Candidacy/verifA?id=${id}&idO=${idIntern}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                }
              });
              const data = await response.json();
              setShowBoolean(data.success);
            };
    
            await checkOffer(); // Attendre que la fonction asynchrone soit terminée avant de passer à l'étape suivante
          })
          .catch(error => console.error(error));
      } 
    }, []);
    
    
  

    React.useEffect(() => {
    
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:5000/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
          ,credentials: 'include'
        })
          .then(response => response.json())
          .then(async (data) => {
            const userData = data.user;
            setUserData(userData);
            const checkOffer = async () => {
              const response = await fetch(`http://localhost:5000/Candidacy/verifA?id=${id}&idO=${idIntern}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                }
              });
              const data = await response.json();
              setShowBoolean(data.success);
            };
    
            await checkOffer(); // Attendre que la fonction asynchrone soit terminée avant de passer à l'étape suivante
          })
          .catch(error => console.error(error));
      } 
    }, []);
    
    


 
    function handleCheckboxChangeeducations(event) {
      const educationId = event.target.id;
      const education = userd.educations.find(e => e._id === educationId);
      const updatedEducations = event.target.checked 
        ? [...selectedEducation, education] 
        : selectedEducation.filter(e => e._id !== educationId);
      setSelectedEducation(updatedEducations);
    }
    function handleCheckboxChangeexperieneces(event) {
      const experienceId = event.target.id;
      const experience = userd.experiences.find(a => a._id === experienceId);
      const updatedExperiences = event.target.checked 
        ? [...selectedExperience, experience] 
        : selectedExperience.filter(a => a._id !== experienceId);
      setSelectedExperience(updatedExperiences);
    }

    const redirectToApplies = () => {

     history.push(`/ListCandidaciesOffer/${id}`);
  
    }

    const redirect = () => {

      const idP=id;
     history.push(`/showApply?param=${idP}`);
  
    }
    const handleSubmit = async (event,oui) => {
      event.preventDefault();
    
      const formData = new FormData();
      formData.append("file", file);
      formData.append("lettre", lettre);
      formData.append("offer", id);
      formData.append("intern", localStorage.getItem("id"));
      formData.append("selectedExperience",  JSON.stringify(selectedExperience));
      formData.append("selectedEducation",  JSON.stringify(selectedEducation));
      formData.append("selectedSkills",  JSON.stringify(selectedSkills));
      formData.append("description", description);
      formData.append("oui", oui);
      try {

        const response = await fetch("http://localhost:5000/Candidacy/apply", {
          method: "POST",
          body: formData
        });
        Swal.fire(
          'Success!',
          'Apply added successfully!',
          'success'
        )

        const data = await response.json();
    
        setAlertMessage("Registration successful!");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          history.push("/profile");
        }, 2000);
      } catch (error) {
        setShowAlert(true);
      }
    };
    
    
  const handleClick= () => {

    setIsSelected(true);
    setIsSelected2(false);

  }
  const handleClick2= () => {
    setIsSelected(false);

    setIsSelected2(true);
  }

const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSkills([...selectedSkills, value]);
    } else {
      setSelectedSkills(selectedSkills.filter(skill => skill !== value));
    }
  };
  
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
    document.body.classList.add("landing-page");

    // appel de la fonction getOfferDetails pour récupérer l'offre avec l'id correspondant à partir de l'API
   

    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }, []); // met à jour l'effet à chaque fois que l'id change

  // useEffect(() => {
  //   if (id) { // add a check for the id parameter
  //     fetch(`${API}/Offer/displayOffer/${id}`, {
  //       credentials: 'include'
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       setOffers(data);
  //       // setSelectedOffer(data); // Set the fetched offer as the selected offer
  //       // console.log(setOffers(data));

  //     })      
  //     .catch(error => console.error(error));
  //   }
  // }, [id]);
  

  useEffect(()=> {
    axios.get(`http://localhost:5000/Offer/displayOffer/${id}`)
    .then((res)=>{
      setOffers(res.data);
      setCategory(res.data.category)
    })
    .catch((err)=> {
      console.log("Error from OfferDetails");
    })
  }, [id]);
  
  






  return(
    <>
   <CondidatNavbar />
      <OfferHeader />
      <Container style={{ marginTop: "30px" }}>
        <Row>
          <Col md={4}>
          
            
          </Col>
          <Col md={12}>
          <Card className="mb-4"  key={offer._id}>
                  
          <CardBody>
                    <CardTitle tag="h2">
                      <center>
                      {offer.title}
                      </center>
                    </CardTitle>
                    <br></br>
                    <br></br>
<Row>
                   <CardText className="h6 col-md-6">Category of Offer: <span className="off">{category.name} </span></CardText>    
                   <CardText className="h6">Type of Offer: <span className="off">{offer.type_offre} </span></CardText>   

                       </Row>   
                       
                    <Row>                  
                    <CardText className="h6 col-md-6">Duration: <span className="off"> {offer.duration} Days </span></CardText>                    
                    <CardText className="h6">Location:<span className="off"> {offer.location}</span> </CardText>          
                    </Row>    
                    <Row>      
                    <CardText className="h6 col-md-6">Requisted Languages:<span className="off">{offer.languages} </span></CardText>                    
                    <CardText className="h6">Duration: <span className="off">{offer.duration} Days </span></CardText>                    

                    </Row>
                    <Row>      
                    <CardText className="h6 col-md-6">Number places available : <span className="off"> {offer.nb_places_available} </span></CardText>                    
                    <CardText className="h6"> Availability:<span className="off"> {offer.availability} </span></CardText>  

                    </Row>
                    <Row>      
                    <CardText className="h6 col-md-6">Start Date: <span className="off">{new Date(offer.startDate).toLocaleDateString()}</span> </CardText>                    
                    <CardText className="h6">End Date: <span className="off"> {new Date(offer.endDate).toLocaleDateString()}</span> </CardText>                    

                    </Row>
                    <Row>           
                    <CardText className="h6 col-md-6">Description: <span className="off">{offer.description} </span></CardText>
                    </Row>
                  </CardBody>
                </Card>
                <div>

                <Button color="secondary" onClick={() => history.goBack()}>
              Go back
            </Button>
            <span style={{ marginRight: '60px' }} />
    
                  
                  {showBoolean==false &&  role!="company" &&(
        <Button color="primary" onClick={openForm}>
          Apply
        </Button>
      )}
                {showBoolean==true && role!="company" && (
        <Button color="primary" onClick={redirect}>
          Consult your apply
        </Button>
      )}
                  { role=="company" && (
        <Button className="bbtt2" color="primary" onClick={redirectToApplies}>
          Consult the applies
                  </Button>
      )}
                  { role=="company" && (

<>                           <Button className="bbt" color="success" onClick={() => handleAddQuizClick(offer._id)
                           }
                           >
                               Add Quizz
                           </Button>
                           <Button className="bbtt2" color="info" onClick={() => handleViewQuizzesClick(offer._id)}
                           >
                               Voir Quizs
                           </Button>
                       </>
)}
                  
                </div>
          </Col>
        </Row>
      </Container>
      
      <div>
      <Modal isOpen={modal} toggle={openForm}>
        <ModalHeader className="h4" toggle={openForm}>Apply for this offer</ModalHeader>
        <ModalBody>
          <Form>
          <Button color="danger" className={`oui bb mb-2 mr-3 ${isSelected ? "selected" : ""}`} 

          onClick={() => handleClick()}>

              <div>CV general</div>
            </Button>
          <Button  className={`oui bb mb-2 mr-3 ${isSelected2 ? "selected" : ""}`} onClick={() => {
  openFormCv();
  handleClick2();
}}>
          <div>Bespoke CV</div>
          </Button>
            <FormGroup>
              <Label for="lettre" className="form-label">Cover Letter</Label>
              <Input type="textarea" value={lettre} name="lettre" id="lettre" placeholder="Cover Letter"
                                    className="form-input"
                                    onChange={e => setLettre(e.target.value)}
                                      />
            </FormGroup>
          </Form>
          {showAlert && (
                      <Alert color="success">{alertMessage}</Alert>
                    )}
        </ModalBody>
        <ModalFooter>
          <Button color="success" className="bbt" onClick={(event) => handleSubmit(event,"gen")} type="submit">Apply</Button>
        </ModalFooter>
      </Modal>

      
    </div>

    <div>
      <Modal isOpen={modalCv} toggle={openFormCv}>
        <ModalHeader toggle={openFormCv}>Bespoke CV</ModalHeader>
        <ModalBody>
          <Form>
          
          <FormGroup>
              <Label for="lettre"><h6>Cover Letter</h6></Label>
              <Input type="textarea" value={lettre} name="lettre" id="lettre" placeholder="Cover Letter"
                                   onChange={e => setLettre(e.target.value)}
                                   className="form-input"

                                      />
            </FormGroup>
          <FormGroup>
              <Label for="lettre"><h6>Description :</h6></Label>
              <Input type="textarea" value={description} name="description" id="description" placeholder="Describe your self..."
                                                              className="form-input"

                           onChange={e => setDescription(e.target.value)}
                                      />
            </FormGroup>
            <FormGroup>
<h6> Skills: </h6>
            {userd && userd.skills && userd.skills.map((name, index) => (
  <div  key={index}>


    
    <input type="checkbox" id={`skill_${index}`} name={`skill_${index}`} value={name} 
    onChange={handleCheckboxChange}   />
    <label className="form-label2 mr" htmlFor={`skill_${index}`}>{name}</label>
  </div>
))}
            </FormGroup>
          
            <FormGroup>
            <h6> Educations: </h6>

            {userd && userd.educations && userd.educations.map((education, index) => (
  <div key={education._id}>
    <input type="checkbox" id={education._id} name={education._id} value={education} 
    onChange={handleCheckboxChangeeducations} />
    <label className="form-label2 mr" htmlFor={`skill_${index}`}>Worked at: {education.company} from : {new Date(education.startDate).toLocaleDateString()} to: {new Date(education.endDate).toLocaleDateString()}</label>
  </div>
))}
            </FormGroup>

            <FormGroup>
<h6> experiences: </h6>
            {userd && userd.experiences && userd.experiences.map((experience, index) => (
  <div key={experience._id}>
    <input type="checkbox" id={experience._id} name={experience._id} value={experience} 
    onChange={handleCheckboxChangeexperieneces} />
    <label className="form-label2 mr" htmlFor={`skill_${index}`}>Worked at: {experience.company} from : {new Date(experience.startDate).toLocaleDateString()} to: {new Date(experience.endDate).toLocaleDateString()}</label>
  </div>
))}
            </FormGroup>
<FormGroup>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </FormGroup>
          </Form>


      
          {showAlert && (
                      <Alert color="success">{alertMessage}</Alert>
                    )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="bbt" onClick={(event) => handleSubmit(event,"spec")}  type="submit">Apply</Button>
        </ModalFooter>
      </Modal>

      
    </div>

    <div>
      <Modal isOpen={modalQuizz} toggle={handleAddQuizClick}>
        <ModalHeader toggle={handleAddQuizClick}>Add new Quizz</ModalHeader>
        <ModalBody>
                                            <CardBody>
                                            
                                    <Col lg="12">
                                        <div className="mb-8">
                                            {showQuizForm &&  (
                                                <Card>
                                                    <CardBody className="col-md-12">
                                                        <Form onSubmit={handleQuizFormSubmit}>
                                                            <FormGroup>
                                                                <Label for="quizName">Name of quizz</Label>
                                                                <Input type="text" id="quizName" name="name" value={quizData.name} onChange={handleInputChange} />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="quizCoefficient">Coefficient</Label>
                                                                <Input type="number" id="quizCoefficient" name="coefficient" value={quizData.coefficient} onChange={handleInputChange} />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="quizTimeout">
                                                                    Délai (en secondes)
                                                                </Label>
                                                                <Input type="number" id="quizTimeout" name="timeout" value={quizData.timeout} onChange={handleInputChange} />
                                                            </FormGroup>
                                                            <div className="d-flex justify-content-between">
                                                                <Button type="submit">Add</Button>
                                                                <Button color="secondary" onClick={() => setShowQuizForm(false)}
                                                                >
                                                                    Annuler
                                                                </Button>
                                                            </div>
                                                        </Form>
                                                        {showAlert && (
                      <Alert color={couleur}>{alertMessage}</Alert>
                    )}
                                                    </CardBody>
                                                </Card>
                                            )}
                                        </div>
                                    </Col>
                                    </CardBody>
                                        </ModalBody>
                                        </Modal>
                                        </div>


                                        
                                                {quizzes.length === 0 ? (
                                                    <p>Aucune question pour le moment.</p>
                                                ) : (<>
                                                                                        <CardTitle className="titleQuiz col-md-12" tag="h5">List of Quiz</CardTitle>

                                                    <Table  responsive className="col-md-10 tab">
                                                        <thead>
                                                            <tr>
                                                                <th>No.</th>
                                                                <th>Nom</th>
                                                                <th>Coefficient</th>
                                                                <th>Timeout</th>
                                                                <th>Score maximal</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {quizzes
                                                                .slice(
                                                                    currentPage * itemsPerPage,
                                                                    (currentPage + 1) * itemsPerPage
                                                                )
                                                                .map((quiz, index) => (
                                                                    <tr col-md-10 key={quiz._id}>
                                                                        <th scope="row" className="col-md-1">{index + 1}</th>
                                                                        <td>{quiz.name}</td>
                                                                        <td>{quiz.coefficient}</td>
                                                                        <td>{quiz.timeout}</td>
                                                                        <td className="col-md-1">{quiz.scoremax}</td>

                                                                        <td className="bttn"> <Button color="secondary" onClick={() => handleViewQuestionsClick(offer._id, quiz._id)}>
                                                                            Voir Questions
                                                                        </Button></td>


                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                        <ReactPaginate previousLabel={"Précédent"} nextLabel={"Suivant"} breakLabel={"..."} breakClassName={"break-me"} pageCount={Math.ceil(quizzes.length / itemsPerPage)} marginPagesDisplayed={2} pageRangeDisplayed={5} onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} />
                                                    </Table>
                                    
                                    
                                    </>
                                    )}
    </>
  )
  
}

export default OfferDetails;