import React from 'react';

const ModalAuthenticationSignIn = () => {
    return (
        <div>
            <div className="modal fade modal-box modal-box-sm" id="sign-in">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-top">
                            <h2 className="title"><span>Sign in</span></h2>
                        </div>
                        <div className="modal-main">
                            <div className="box-signin">
                                <div className="sigin-social">
                                    <a href="" title="" className="btn-h50 flex-center-center signin-facebook">Sign in with Facebook</a>
                                    <a href="" title="" className="btn-h50 flex-center-center signin-ggle">Sign in with Google</a>
                                    <a href="" title="" className="btn-h50 flex-center-center signin-insta">Sign in with Instagram</a>
                                </div>
                                <div className="or">OR</div>
                                <form className="form-sign">
                                    <div className="name-bg mgb-20">
                                        <input type="text" placeholder="Username or email" className="input-radius btn-h50" />
                                    </div>
                                    <div className="name-bg mgb-20">
                                        <input type="password" placeholder="Password" className="input-radius btn-h50" />
                                    </div>
                                    <div className="flex-center-between">
                                        <div className="remember">
                                            <label>
                                                <input type="checkbox" />
                                                <span>Remember Me</span>
                                            </label>
                                        </div>
                                        <a href="" title="" data-toggle="modal" data-target="#forget-password" className="fogot">Forgot password?</a>
                                    </div>
                                    <div className="text-center mgt-30"><button className="btn btn-yellow btn-h60 font-20 font-demi w230">SIGN IN</button></div>
                                </form>
                                <div className="sign-note font-16 font-medium">
                                    <div className="note-first"><span>ABC account can access</span></div>
                                    <div className="note-pre">all other restaurants in the ABC system.</div>
                                </div>
                                <div className="text-center font-18"><span className="font-medium text-ghi">Do not have an account?</span>  <a href="#" title="" className="text-yellow link-underlinef font-demi" data-toggle="modal" data-target="#sign-up">Sign up</a> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </div>
    );
}

export default ModalAuthenticationSignIn;