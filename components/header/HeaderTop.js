const HeaderTop = () => {
    return (<section class="header-top">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-6">
                    <div class="header-top_left flex-center">
                        <div class="header-reser">
                            <span class="mgr-10">RESERVATION: </span>
                            <a href="" title="">1-800-32-345-0230</a>
                        </div>
                        <a href="" title="" class="header-booking">ONLINE BOOKING <i class="fa fa-calendar"></i> </a>
                    </div>
                </div>
                <div class="col-md-6 col-6">
                    <div class="header-top_right flex-center-end">
                        <div class="language">
                            <span class="language-value">EN</span>
                            <ul class="choice-lang">
                                <li>EN</li>
                                <li>Vi</li>
                            </ul>
                        </div>
                        <div class="social flex-center">
                            <span>FOLLOW US:</span>
                            <a href="" title="" class="fa fa-facebook"></a>
                            <a href="" title="" class="fa fa-pinterest"></a>
                            <a href="" title="" class="fa fa-twitter"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default HeaderTop;