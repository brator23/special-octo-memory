let API = "http://localhost:8000/products";

async function getContacts(){
    try {
        let res = await axios.get(API);
        return res.data
    } catch (error){
        console.error("Ошибка при получении контактов", error);
    }
}

async function addContact(contactData) {
    try {
      const response = await axios.post(API, contactData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при добавлении контакта:', error);
    }
};

async function updateContact(contactId, updatedData) {
    try {
      const response = await axios.put(`${API}/${contactId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении контакта:', error);
    }
}

async function deleteContact(contactId) {
    try {
      const response = await axios.delete(`${API}/${contactId}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при удалении контакта:', error);
    }
}

async function displayContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
  
    const contacts = await getContacts();
  
    contacts.forEach(contact => {
      const li = document.createElement('li');
      li.textContent = `${contact.firstName} ${contact.lastName} - ${contact.phoneNumber}`;
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Удалить';
      deleteButton.addEventListener('click', async () => {
        await deleteContact(contact.id);
        displayContacts();
      });
  
      li.appendChild(deleteButton);
      contactList.appendChild(li);
    });
}

let contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", async event => {
    event.preventDefault();

    let ferstName = document.getElementById("ferstName").value;
    let lastName = document.getElementById("lastName").value;
    let photoNumber = document.getElementById("photoNumber").value;
    let photo = document.getElementById("photo").value;

    let contactData = {
        ferstName,
        lastName,
        photoNumber,
        photo,
    };

    await addContact(contactData);
    displayContacts();
    contactForm.reset();
});

displayContacts();