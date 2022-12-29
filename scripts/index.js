function renderJobs(array) {

    const list = document.querySelector('.list__container')

    array.forEach(element => {

        const card = createJob(element)

        list.appendChild(card)

    })
}

function createJob(array) {

    const jobContainer = document.createElement('li')
    const jobBox1 = document.createElement('div')
    const jobTitle = document.createElement('h2')
    const jobBox2 = document.createElement('div')
    const jobBox2Enterprise = document.createElement('p')
    const jobBox2Location = document.createElement('p')
    const jobDescrition = document.createElement('p')
    const jobBox3 = document.createElement('div')
    const jobBox3Tag = document.createElement('p')
    const jobBox3Button = document.createElement('button')

    jobContainer.classList.add('job__container')

    jobBox1.classList.add('job__box1')

    jobTitle.classList.add('job__title')
    jobTitle.innerText = array.title

    jobBox2.classList.add('job__box2')

    jobBox2Enterprise.classList.add('job__box2--text')
    jobBox2Enterprise.innerText = array.enterprise

    jobBox2Location.classList.add('job__box2--text')
    jobBox2Location.innerText = array.location

    jobDescrition.classList.add('job__text')
    jobDescrition.innerText = array.descrition

    jobBox3.classList.add('job__box3')

    jobBox3Tag.classList.add('job__box3--tag')
    jobBox3Tag.innerText = array.modalities[0]
    

    jobBox3Button.classList.add('job__box3--button')
    jobBox3Button.dataset.id = array.id
    jobBox3Button.innerText = "Candidatar"
    
    jobContainer.append(jobBox1, jobDescrition, jobBox3)
    jobBox1.append(jobTitle, jobBox2)
    jobBox2.append(jobBox2Enterprise, jobBox2Location)
    jobBox3.append(jobBox3Tag, jobBox3Button)

    return jobContainer
    
}

function renderLocalStorage(){

    const storage = JSON.parse(localStorage.getItem('@webWoman:jobApplication')) || []

    return renderJobApplication(storage)
}

function renderJobApplication(array) {
    
    const applicationList = document.querySelector('.aside__list')

    applicationList.innerHTML = ''

    if(array.length <= 0){
        
        const emptyApplicataion = emptyJobApplicataion()

        applicationList.appendChild(emptyApplicataion)


    }else{

    array.forEach(element => {

        const JobApplication = createJobApplication(element)

        applicationList.appendChild(JobApplication)

    })

    removeApplication(array)
    
    }
}

function emptyJobApplicataion() {

    const asideBlock = document.createElement('li')
    const asideText = document.createElement('p')
    const asideImg = document.createElement('img')

    asideBlock.classList.add('aside__empty')

    asideText.classList.add('aside__text')
    asideText.innerText = "Você ainda não aplicou para nenhuma vaga"

    asideImg.classList.add('aside__img')
    asideImg.src = "./assets/no-items.svg"
    asideImg.alt = "Empty Job Application"

    asideBlock.append(asideText, asideImg)

    return asideBlock

}



function createJobApplication(array) {

    const applicationContainer = document.createElement('li')
    const applicationBox1 = document.createElement('div')
    const applicationBox1Tittle = document.createElement('h2')
    const applicationBox1Img = document.createElement('img')
    const applicationBox2 = document.createElement('div')
    const applicationBox2Enterprise = document.createElement('p')
    const applicationBox2Location = document.createElement('p')
    

    applicationContainer.classList.add('application__container')

    applicationBox1.classList.add('application__box1')

    applicationBox1Tittle.classList.add('application__jobTitle')
    applicationBox1Tittle.innerText = array.title

    applicationBox1Img.classList.add("application__button")
    applicationBox1Img.src = ("/assets/trash.png")
    applicationBox1Img.alt = "Remove Button"
    applicationBox1Img.dataset.id = array.id

    applicationBox2.classList.add('application__box2')

    applicationBox2Enterprise.classList.add('application__box--text')
    applicationBox2Enterprise.innerText = array.enterprise

    applicationBox2Location.classList.add('application__box--text')
    applicationBox2Location.innerText = array.location

    applicationContainer.append(applicationBox1, applicationBox2)
    applicationBox1.append(applicationBox1Tittle, applicationBox1Img)
    applicationBox2.append(applicationBox2Enterprise, applicationBox2Location)

    return applicationContainer

}

function addApplication() {

    const buttons = document.querySelectorAll('.job__box3--button')

    buttons.forEach(button => {

        button.onclick = (event) => {

            const findApplication = jobsData.find(job => {

                return job.id == event.target.dataset.id
                
            })

            const jobToApplication = {
                
                ... findApplication,
                
            }

        button.innerText = "Remover Candidatura"
        button.classList.replace("job__box3--button", "job__box3--buttonRemove")

        jobsApplication.push(jobToApplication)

        localStorage.setItem("@webWoman:jobApplication", JSON.stringify(jobsApplication))

        renderJobApplication(jobsApplication)

        removeApplicationButton(jobsApplication)

    }
    })
}

function removeApplicationButton(array){

    const removeButtons = document.querySelectorAll('.job__box3--buttonRemove')

    removeButtons.forEach(button => {

        button.onclick = (event) => {
  
            const jobInApplication = array.find(job => {

                return job.id == event.target.dataset.id

            })

            const jobIndex = array.indexOf(jobInApplication)

            array.splice(jobIndex, 1)

            button.innerText = "Candidatar"
            button.classList.replace("job__box3--buttonRemove", "job__box3--button")
            localStorage.setItem("@webWoman:jobApplication", JSON.stringify(jobsApplication))


            renderJobApplication(array)

            addApplication()
         
        }
      })
}



function removeApplication(array) {

    const applicationButtons = document.querySelectorAll('.application__button')
    const removeButtons = document.querySelectorAll('.job__box3--buttonRemove')
  
    applicationButtons.forEach(button => {

        button.onclick = (event) => {

            const jobInApplication = array.find(job => {

            return job.id == event.target.dataset.id

        })

        removeButtons.forEach(buttonApplication => {

            if(buttonApplication.dataset.id == event.target.dataset.id){

                buttonApplication.innerText = "Candidatar"
                buttonApplication.classList.replace("job__box3--buttonRemove", "job__box3--button")

                addApplication()

            }
        })

        const jobIndex = array.indexOf(jobInApplication)
  
        array.splice(jobIndex, 1)

        localStorage.setItem("@webWoman:jobApplication", JSON.stringify(jobsApplication))
  
        renderJobApplication(array)
       
      }
    })
}

function updateJobsApplication(){

    const storage = JSON.parse(localStorage.getItem('@webWoman:jobApplication'))
    const buttons = document.querySelectorAll('.job__box3--button')

    buttons.forEach(button => {

        storage.forEach(job => {

            if(job.id == button.dataset.id){

                button.innerText = "Remover Candidatura"
                button.classList.replace("job__box3--button", "job__box3--buttonRemove")
        
                jobsApplication.push(job)
        
                renderJobApplication(jobsApplication)
        
                removeApplicationButton(jobsApplication)
            }
            
        })

    })

}

renderJobs(jobsData)

renderLocalStorage()

addApplication()

updateJobsApplication()