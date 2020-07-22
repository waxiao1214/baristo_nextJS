const TheFooter = () => {
    return (<section className="footer" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"
        xmlns="http://www.w3.org/1999/html">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="footer-1">
                        <div className="logo-footer"><a href="" title=""><img src="images/icon/logo-white.svg" alt="" title="" /> </a></div>
                        <div className="desc font-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut turpis lacinia. Etiam suscipit sapien a convallis </div>
                        <div className="social">
                            <a href="" title="" className="fa fa-facebook"></a>
                            <a href="" title="" className="fa fa-twitter"></a>
                            <a href="" title="" className="fa fa-pinterest"></a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="footer-2">
                        <h4>CONTACT INFO</h4>
                        <div className="footer-info footer-address"><span>123 Street, Knightsbridge, Central London</span></div>
                        <div className="footer-info footer-phone"><a href="" title="">1-800-234-23-2389</a></div>
                        <div className="footer-info footer-mail"><a href="" title="">Infor@gmail.com</a></div>
                        <div className="footer-info footer-clock">
                            <div className="flex-center-between"><span>Lunch</span><span>Everyday</span></div>
                            <div className="flex-center-between"><span>Dinner: Mon- Thu</span><span>18:00- 21:30</span></div>
                            <div className="flex-center-between"><span>Dinner: Fri- Sun</span><span>19:00- 21:30</span></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="footer-2">
                        <h4>SUBCRIBE</h4>
                        <form className="search">
                            <input type="text" placeholder="E-Mail" />
                            <button type="submit"><i className="fa fa-send"></i> </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="footer-bottom flex-center-between">
                        <div className="footer-article flex-center">
                            <a href="" title="">TERM & CONDITION</a>
                            <a href="" title="">POLICY</a>
                        </div>
                        <div className="copyright">Copyrights 2019 <a href="" title="">Baristo</a> . All rights reserved</div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default TheFooter;