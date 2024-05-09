import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";
import styles from "../styles/Footer.module.css"
const FooterPage = () => {
  return (
    <MDBFooter style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} className='text-center text-lg-start text-muted'>
      

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="7" className='mx-auto mb-4'>
              <h5 className='text-uppercase fw-bold mb-1 mt-3'>
                About Us
              </h5>
              <p>
                Welcome to Recipe Domain, where passion
                for food meets culinary innovation. Our platform
                is dedicated to bringing together home cooks, professional
                chefs, and food enthusiasts from around the world. Discover,
                share, and revel in a vast collection of recipes that cater
                to all tastes and dietary needs.
              </p>
              <div>
                </div>
            </MDBCol>

            <MDBCol md="4" className='mx-auto mb-md-0 mb-4'>
              <h5 className='text-uppercase fw-bold mb-1 mt-3'>Contact</h5>
              <p className="m-0">
                <MDBIcon icon="home" className="m-0" />
                New York, NY 10012, US
              </p>
              <p className="m-0">
                <MDBIcon icon="envelope" className="me-1" />
                info@example.com
              </p>
              <p className="m-0">
                <MDBIcon icon="phone" className="me-1" /> + 01 234 567 88
              </p>
              <p className="m-0">
                <MDBIcon icon="print" className="me-1" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        &copy; {new Date().getFullYear()} Made by &nbsp;&nbsp;
        <a className='text-reset fw-bold' href='https://redifoo.me/'>
          <strong>Kaan Redif</strong>
        </a>
        &nbsp;&nbsp; for diploma in fullstack at Code Institute &nbsp;&nbsp;&nbsp;
        <a href='https://www.linkedin.com/in/kaan-redif/' >
                  <MDBIcon className={styles.SocialIcon} fab icon="linkedin" />
                </a>
                <a href='https://github.com/redifo' >
                  <MDBIcon className={styles.SocialIcon}  fab icon="github" />
                </a>


      </div>
    </MDBFooter>
  );
}

export default FooterPage;