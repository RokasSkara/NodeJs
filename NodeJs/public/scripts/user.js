document.querySelector('#BlogAddToggler').addEventListener('click', () => {
    //selecting appropriate elements for form toggling
    const addBlog = document.querySelector('#BlogAdd')
    const textToggler = document.querySelector('#BlogAddToggler')
    // togling form visibility and button textcontent
    addBlog.classList.toggle('hidden')
    textToggler.textContent === 'Add Blog' ? textToggler.textContent = 'Hide Blog form' : textToggler.textContent = 'Add Blog' 
})