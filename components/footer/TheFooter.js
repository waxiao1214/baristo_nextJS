const TheFooter = () => {
    return (<section class="footer" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"
        xmlns="http://www.w3.org/1999/html">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="footer-1">
                        <div class="logo-footer"><a href="" title=""><img src="images/icon/logo-white.svg" alt="" title="" /> </a></div>
                        <div class="desc font-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut turpis lacinia. Etiam suscipit sapien a convallis </div>
                        <div class="social">
                            <a href="" title="" class="fa fa-facebook"></a>
                            <a href="" title="" class="fa fa-twitter"></a>
                            <a href="" title="" class="fa fa-pinterest"></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="footer-2">
                        <h4>CONTACT INFO</h4>
                        <div class="footer-info footer-address"><span>123 Street, Knightsbridge, Central London</span></div>
                        <div class="footer-info footer-phone"><a href="" title="">1-800-234-23-2389</a></div>
                        <div class="footer-info footer-mail"><a href="" title="">Infor@gmail.com</a></div>
                        <div class="footer-info footer-clock">
                            <div class="flex-center-between"><span>Lunch</span><span>Everyday</span></div>
                            <div class="flex-center-between"><span>Dinner: Mon- Thu</span><span>18:00- 21:30</span></div>
                            <div class="flex-center-between"><span>Dinner: Fri- Sun</span><span>19:00- 21:30</span></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="footer-2">
                        <h4>SUBCRIBE</h4>
                        <form class="search">
                            <input type="text" placeholder="E-Mail" />
                            <button type="submit"><i class="fa fa-send"></i> </button>
                        </form>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="footer-bottom flex-center-between">
                        <div class="footer-article flex-center">
                            <a href="" title="">TERM & CONDITION</a>
                            <a href="" title="">POLICY</a>
                        </div>
                        <div class="copyright">Copyrights 2019 <a href="" title="">Baristo</a> . All rights reserved</div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default TheFooter;