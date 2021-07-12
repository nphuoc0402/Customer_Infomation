let customers = [];
const key = "data";
class Customer {
  constructor(fullname, email, phone, address) {
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}

function init() {
  if (window.localStorage.getItem(key) == null) {
    let customer1 = new Customer(
      "Joy Boye",
      "hakipo@mailinator.com",
      "Culpa nesciunt pari",
      "9513548",
      "Voluptatem nisi eiu"
    );
    let customer2 = new Customer(
      "Francesca Wyatt",
      "qerokagike@mailinator.com",
      "41284312",
      "Houton"
    );

    customers = [customer1, customer2];
    setLocalStorage(key, customers);
  } else {
    getLocalStorage();
  }
}
function getLocalStorage() {
  customers = JSON.parse(window.localStorage.getItem(key));
}

function setLocalStorage(key, data) {
  data.sort();
  window.localStorage.setItem(key, JSON.stringify(data));
}

function showCustomer() {
  let tbcustomer = document.getElementById("tbcustomer");
  tbcustomer.innerHTML = "";
  for (let i = customers.length - 1; i > 0; i--) {
    tbcustomer.innerHTML += `<tr id="tr_${i}">
                                <td>${i }</td>
                                <td>${customers[i].fullname}</td>
                                <td>${customers[i].email}</td>
                                <td>${customers[i].phone}</td>
                                <td>${customers[i].address}</td>
                                <td style="display:flex; justify-content:space-around; margin-top:1em">
                                    <a type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="editInfoCustomer(${i})"><i class="fa fa-edit"> Edit</i></a>
                                    <a href="javascript:;" class="btn btn-danger" onclick="removeInfoCustomer(${i})">Delete</a>
                                </td>
                            </tr>
                                
                            `;
  }
}
// <a href="javascript:;" class="btn btn-success d-none" onclick="updateInfoCustomer(${i})"><a class="fa fa-save"></a>
// <a href="javascript:;" class="btn btn-warning d-none" onclick="resetInfoCustomer(${i})"><i class="fa fa-remove"></i></a>
function addCustomer() {
  let CustomerName = document.getElementById("name").value;
  let CustomerEmail = document.getElementById("email").value;
  let CustomerPhone = document.getElementById("phone").value;
  let CustomerAddress = document.getElementById("address").value;
  let CustomerPassword = document.getElementById("password").value;
  let CustomerRePassword = document.getElementById("re-password").value;

  CustomerName = CustomerName.replaceAll(/\d/g, "");

  if (
    CustomerName == "" ||
    CustomerEmail == "" ||
    CustomerPhone == "" ||
    CustomerAddress == "" ||
    CustomerPassword == ""
  ) {
    if (isNullOrEmpty(CustomerName)) {
      showMessage("msg-fullname", "fullname");
      setTimeout(() => {
        document.getElementById("msg-fullname").innerText = "";
      }, 1 * 1000);
      // clear();
    }
    if (isNullOrEmpty(CustomerPassword)) {
      showMessage("msg-password", "password");
      setTimeout(() => {
        document.getElementById("msg-password").innerText = "";
      }, 1 * 1000);
      // clear();
    }
    if (CustomerPassword != CustomerRePassword) {
      document.getElementById("msg-repassword").innerText =
        "The confirm password isn't match password!";
      setTimeout(() => {
        document.getElementById("msg-repassword").innerText = "";
      }, 1 * 1000);
    }
    if (isNullOrEmpty(CustomerEmail)) {
      showMessage("msg-email", "email");
      setTimeout(() => {
        document.getElementById("msg-email").innerText = "";
      }, 1 * 1000);
    }
    if (isNullOrEmpty(CustomerPhone)) {
      showMessage("msg-phone", "phone");
      setTimeout(() => {
        document.getElementById("msg-phone").innerText = "";
      }, 1 * 1000);
    }
    if (isNullOrEmpty(CustomerAddress)) {
      showMessage("msg-address", "address");
      setTimeout(() => {
        document.getElementById("msg-address").innerText = "";
      }, 1 * 1000);
    }
  } else {
    let customer = new Customer(
      CustomerName,
      CustomerEmail,
      CustomerPhone,
      CustomerAddress
      
    )
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
    customers.push(customer);
    setLocalStorage(key, customers);
    showCustomer();
    clearDataCustomer();
  }
}

function isNullOrEmpty(str) {
  return str == null || str.trim() == "";
}

function clearDataCustomer() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  document.getElementById("password").value = "";
  document.getElementById("re-password").value = "";
}

function clearUnnecessaryWhiteSpace(str) {
  return str.trim().replace(/  +/g, " ");
}


function editInfoCustomer(i) {
  customer = JSON.parse( localStorage.getItem('data'))[i];
  document.getElementById('change-name').value = customer.fullname;
  document.getElementById('change-email').value =  customer.email;
  document.getElementById('change-phone').value = customer.phone;
  document.getElementById('change-address').value = customer.address;
  document.getElementById('save-change').value = i;

}

function removeInfoCustomer(i) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
       
      )
      customers.splice(i, 1);
      setLocalStorage(key, customers);
      showCustomer();
    }
  })

}

function resetInfoCustomer(i) {
  let tr = document.getElementById(`tr_${i}`);
  let tds = tr.children;
  tds[1].innerHTML = `${customers[i].fullname}`;
  tds[2].innerHTML = `${customers[i].email}`;
  tds[3].innerHTML = `${customers[i].phone}`;
  tds[4].innerHTML = `${customers[i].address}`;
}

function updateInfoCustomer(i) {

    let newName = document.getElementById('change-name').value;
    let newEmail = document.getElementById('change-email').value;
    let newPhone = document.getElementById('change-phone').value;
    let newAddress = document.getElementById('change-address').value;
    let customer = new Customer(
      newName,
      newEmail,
      newPhone,
      newAddress
    )
    customers.push(customer);

    setLocalStorage(key, customers);
    showCustomer();
    showMessage();
  
}

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{2})(\d{2})(\d{3})(\d{3})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3] + "-" + match[4];
  }
  return null;
}

function showMessage(idcustomer, value) {
  document.getElementById(idcustomer).innerText =
    "The " + value + " is required!";
}

function documentReady() {
  init();
  showCustomer();
}



documentReady();
