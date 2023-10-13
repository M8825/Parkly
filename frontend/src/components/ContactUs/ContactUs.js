import "./ContactUs.scss";

function ContactUs() {
    return (
        <>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-lg-6">
                        <div className="section_heading text-center wow fadeInUp" >
                            <h3>Our Creative <span> Team</span></h3>
                            <p>Appland is completely creative, lightweight, clean &amp; super responsive app landing page.</p>
                            <div className="line"></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="single_advisor_profile wow fadeInUp" >
                            <div className="advisor_thumb">
                                <img src={require("./mlkz.png")}/>
                                <div className="social-info"><a href="#"><i className="fa fa-angellist"></i></a><a href="https://github.com/M8825"><i className="fa fa-github"></i></a><a href="https://www.linkedin.com/in/malkhaz-mamulashvili-703a97208/"><i className="fa fa-linkedin"></i></a></div>
                            </div>
                            <div className="single_advisor_details_info">
                                <h6>Malkhaz Mamulashvili</h6>
                                <p className="designation">Team Lead</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="single_advisor_profile wow fadeInUp" >
                            <div className="advisor_thumb">
                            <img src={require("./yen.JPG")}/>
                                <div className="social-info"><a href="https://angel.co/u/yenleespace"><i className="fa fa-angellist"></i></a><a href="https://github.com/Yenleespace"><i className="fa fa-github"></i></a><a href="https://www.linkedin.com/in/yenleespace/"><i className="fa fa-linkedin"></i></a></div>
                            </div>
                            <div className="single_advisor_details_info">
                                <h6>Yen Lee</h6>
                                <p className="designation">Flex Lead</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="single_advisor_profile wow fadeInUp" >
                            <div className="advisor_thumb">
                            <img src={require("./yen.JPG")}/>
                                <div className="social-info"><a href="https://angel.co/u/stiven-kang"><i className="fa fa-angellist"></i></a><a href="https://github.com/stivenkang"><i className="fa fa-github"></i></a><a href="https://www.linkedin.com/in/stiven-kang-69a9ab258/"><i className="fa fa-linkedin"></i></a></div>
                            </div>
                            <div className="single_advisor_details_info">
                                <h6>Stiven Kang</h6>
                                <p className="designation">Frontend Lead</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="single_advisor_profile wow fadeInUp" >
                            <div className="advisor_thumb">
                            <img src={require("./yen.JPG")}/>
                                <div className="social-info"><a href="#"><i className="fa fa-angellist"></i></a><a href="https://www.github.com/josephbergmann/"><i className="fa fa-github"></i></a><a href="https://www.linkedin.com/in/joseph-bergmann-06855a268/"><i className="fa fa-linkedin"></i></a></div>
                            </div>
                            <div className="single_advisor_details_info">
                                <h6>Joseph Bergmann</h6>
                                <p className="designation">Backend Lead</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs;
