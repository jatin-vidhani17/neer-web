import React from "react"
const Footer = () => {
    return (
        <footer>
            <p className="bg-gray-800 p-2"></p>
        <section class="bg-gray-100 py-8">
            <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center text-gray-700">
            <div>
                <a href="https://www.gujaratuniversity.ac.in/" target="_blank" rel="noopener noreferrer">
                <img src="/assets/images/gu.png" alt="Gujarat University" class="h-24 mx-auto mb-4"/>
                <h3 class="text-xl">Gujarat University</h3></a>
            </div>
            <div>
                <a href="https://www.sac.gov.in/" target="_blank" rel="noopener noreferrer">
                <img src="/assets/images/sag.png" alt="Space Application Center" class="h-24 mx-auto mb-4"/>
                <h3 class="text-xl">Space Application Center</h3></a>
            </div>
            <div>
                <a href="https://dst.gov.in/" target="_blank" rel="noopener noreferrer">
                <img src="/assets/images/dst.png" alt="Department of Science & Technology" class="h-24 mx-auto mb-4"/>
                <h3 class="text-xl">Department of Science & Technology</h3></a>
            </div>
            </div>
        </section>
        
            <div class="container mx-auto text-center text-gray-700">
            <p>Developed and Maintained by Department of Computer Science and Gujarat University</p>
            </div>
        </footer>
    )
}
export default Footer;