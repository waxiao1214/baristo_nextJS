const HeaderBottom = () => {
    return (<section class="header-bottom">
        <div class="container">
            <div class="row">
                <div class="col-md-2 between-mb flex-center">
                    <div class="logo">
                        <a href="index.html" title=""><img src="images/icon/logo.svg" alt="" /> </a>
                    </div>
                    <div class="right-mb relative visible-mobile">
                        <button class="btn-default btn-search-mb"><i class="fa fa-search"></i> </button>
                        <button class="btn-default btn-user-mb"><i class="fa fa-user-o"></i> </button>
                        <ul class="user-abs">
                            <li><a href="" title="" data-target="#sign-in" data-toggle="modal">Login</a> </li>
                            <li><a href="#" title="" data-target="#sign-up" data-toggle="modal">Join Now</a> </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="header-main">
                        <div class="row">
                            <div class="col-md-6 abs-mb">
                                <div class="search-relative relative">
                                    <form class="search">
                                        <button type="submit"><i class="fa fa-search"></i> </button>
                                        <input type="text" placeholder="Searching..." />
                                    </form>
                                    <button class="btn-tranfer btn-filter" data-target="#search-filter" data-toggle="modal"><i class="fa fa-filter"></i> </button>
                                </div>
                            </div>
                            <div class="col-md-6 visible-desktop">
                                <div class="header-action">
                                    <a href="" title="" class="location"><i class="fa fa-map-marker"></i>NEW YORK </a>
                                    <button class="btn-tranfer btn-login" data-target="#sign-in" data-toggle="modal">LOGIN</button>
                                    <button class="btn btn-white btn-h60 btn-join" data-target="#sign-up" data-toggle="modal">JOIN NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>);
}

export default HeaderBottom;