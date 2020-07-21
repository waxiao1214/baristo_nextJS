const PageSectionIndexHero = () => {
    return (<section class="banner">
        <div class="banner-slider">
            <div class="banner-item" style={{ background: `url('images/picture/banner.png') no-repeat right bottom /cover` }}>
                <div class="banner-text">
                    <div class="container">
                        <h4>We supply</h4>
                        <h3>The Highest Quality And Tasty Food</h3>
                        <button class="btn btn-h80 btn-yellow inflex-center-center" onclick="window.location.href=base_url + 'menu.html'">EXPLORE <i class="ti-arrow-right"></i> </button>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default PageSectionIndexHero;