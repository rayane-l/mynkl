
import emailjs from "@emailjs/browser";
import React from "react";
import { useAppSelector } from "../app/hooks";


export default function Footer() {
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  //Librairie EMailJS
  const sendEmail = (e: any) => {
    e.preventDefault();
    emailjs.sendForm("service_bnlbfoy", "template_j2x9pkc", e.target, "A1g8Dt5lH_q3WLIxG")
      .then(() => {
        alert("Message envoyé")
      }, (error) => {
        console.log(error.text);
        alert("Il s'est produit une erreur lors de l'envoi de votre message")
      });
  }


  return (
    <>
      <footer style={{
        filter: `url(${urlColor})`
      }} className="bg-gradient-to-r from-greyNakala/60  to-greyNakala/40 ">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-5">
          <div className="lg:grid lg:grid-cols-2 ">
            <div
              className="py-16 border-b border-gray-200  lg:border-b-0 lg:border-l lg:order-last lg:pl-10 "
            >
              <div className="flex justify-center text-teal-300 lg:hidden ">
                <div className="basis-1/4 flex items-center ">
                  <img
                    className="  cursor-pointer m-1  "
                    src={process.env.PUBLIC_URL + "/Logos/v3_1.svg"}
                    alt="logoMyNkl"
                  />
                </div>
              </div>
              <div className="mt-8 space-y-4 lg:mt-0  ">
                <span className="bg-gradient-to-r from-greyNakala/40  to-redCahier/70 rounded lg:h-1 lg:w-10 lg:block"></span>
                <div className="text-center lg:text-left font-fontAr">
                  <h5 className="text-3xl font-medium text-gray-700">Une difficulté ? Écrivez nous ! </h5>
                  <p
                    className="max-w-md mx-auto mt-4 text-md leading-relaxed text-gray-600 lg:mx-0"
                  >
                    Nous mettons à disposition un système de tickets.<br /> Contactez-nous en cas de problèmes concernant l'utilisation
                    de l'application Mynkl.
                  </p>
                </div>
                <form onSubmit={sendEmail} className="space-y-4 ">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        className="w-full p-3 bg-white/60 text-sm border-gray-200 rounded-md"
                        placeholder="Votre nom"
                        type="text"
                        name='from_name'
                        required
                      />
                    </div>
                    <div>
                      <input
                        className="w-full bg-white/60 p-3 text-sm border-gray-200 rounded-md"
                        placeholder="Votre email"
                        type="email"
                        name='from_email'
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <textarea
                      className="w-full p-3 text-sm rounded-lg  bg-white/60 border-none rounded-md focus:outline-none focus:ring-2
                       focus:ring-offset-2 focus:ring-offset-greyNakala/50 focus:ring-redCahier/30"
                      placeholder="Message"
                      rows={4}
                      id="message"
                      name='message'
                      required
                    >
                    </textarea>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      className="font-fontAr  p-3 transition  bg-gradient-to-r from-greyNakala/40  to-redCahier/70 hover:bg-redCahier
                       text-white rounded top-1/2 right-1.5"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="pt-16 pb-8 relative">
              <div className="hidden text-teal-300 lg:flex ">
                <div className="basis-1/4 flex items-center ">
                  <img
                    className="  cursor-pointer m-1  "
                    src={process.env.PUBLIC_URL + "/Logos/v3_1.svg"}
                    alt="logoMyNkl"
                  />
                </div>
              </div>
              <div
                className="pt-8 mt-16 text-sm text-white border-t border-gray-200 w-2/3 lg:absolute bottom-4"
              >
                <p className="text-center flex space-x-4 lg:text-left">
                  <a href="https://www.facebook.com/consortium.cahier" target="_blank" rel="noreferrer">
                    <svg
                      className="w-8 h-8 text-redCahier/70 hover:text-redCahier  fill-current border border-redCahier rounded-full p-1  "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007
                         1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532
                          3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                  </a>
                  <a href="https://twitter.com/ccahier" target="_blank" rel="noreferrer">
                    <svg
                      className="w-8 h-8 text-redCahier/70 hover:text-redCahier fill-current border border-redCahier rounded-full p-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 
                        1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188
                         4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604
                          3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 
                          13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                      />
                    </svg>
                  </a>
                </p>
                <p className="mt-4 text-center text-gray-700 lg:text-left">
                  &copy; Mynkl
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}