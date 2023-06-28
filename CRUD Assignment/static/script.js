let current_student = {};
let students = [];
let detail = {};
let details = [];
let remove_detail_id = null;

function register() {
    let data = {
        name: document.getElementById("student_name").value,
        nrc: document.getElementById("student_nrc").value,
        dob: document.getElementById("student_dob").value,
        phone_no: document.getElementById("student_phone_no").value,
        email: document.getElementById("student_email").value,
        gender: document.getElementById("student_gender").value,
        nationality: document.getElementById("student_nationality").value,
        permanent_address: document.getElementById("student_address").value
    }

    let request = new XMLHttpRequest();
    request.open("POST", '/register');
    request.setRequestHeader("Content-Type", "application/json");
    
    request.onload = function() {
        if(request.status >= 200 && request.status < 400) {
            let response = JSON.parse(request.responseText);
            current_student = response;
            save_to_localStorage("student", current_student);
            console.log("current_student: ", current_student);

            let success_response = false;
            
            if(request.status == 200) {
                success_response = true;
            }

            if(success_response) {
                if(!document.getElementById("successful_registration")){
                    let student_container = document.getElementById("student_container");
                    let register_success_html = generate_html("register_success");
                    student_container.innerHTML = student_container.innerHTML + register_success_html;
                }

                setTimeout(function() {
                    let successful_registration_message = document.getElementById("successful_registration");
                    student_container.removeChild(successful_registration_message);

                    let form_container = document.getElementById("form_container");
                    let student_html = generate_html("student", current_student);
                    let student_detail_html = generate_html("student_detail");
                    form_container.innerHTML = student_html + student_detail_html;

                    let student_gender_selection = document.getElementById('student_gender');
                    for(let i = 0; i < student_gender_selection.options.length; i++) {
                        let option = student_gender_selection.options[i];
                        if (option.value === current_student.gender) {
                            option.selected = true;
                            break;
                        }
                    }

                    let student_nationality_selection = document.getElementById('student_nationality');
                    for(let i = 0; i < student_nationality_selection.options.length; i++) {
                        let option = student_nationality_selection.options[i];
                        if (option.value === current_student.nationality) {
                            option.selected = true;
                            break;
                        }
                    }

                    check_student_details();

                    // go_to_page("student_detail");
                }, 1000);
            }
        } else {
            console.error("error: ", response.status);
        }
    }

    request.onerror = function() {
        console.error("Something went wrong while registering student!");
    }

    request.send(JSON.stringify(data));
}


function check_student_details() {
    current_student = load_from_localStorage("student");

    let data = {
        id: current_student.id
    };

    let request = new XMLHttpRequest();
    request.open("POST", "/get_details");
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function() {
        if(request.status >= 200 && request.status < 400) {
            let response = JSON.parse(request.responseText);
            details = response
            let new_details = load_from_localStorage("details");
            if(new_details) {
                details = details.concat(new_details);
            }
            details.forEach(function(detail) {
                detail["detail_id"] = details.indexOf(detail);
            })
            save_to_localStorage("details", details);

            let success_response = false;

            if(request.status == 200) {
                success_response = true;
            }

            if(success_response){
                let student_detail_list = document.getElementById("student_detail_list");
                details.forEach(function(detail) {
                    let student_detail_data_html = generate_html("student_detail_data", detail);
                    student_detail_list.innerHTML = student_detail_list.innerHTML + student_detail_data_html.trim();
                });
            }
        } else {
            console.error("error: ", response.status);
        }
    }

    request.onerror = function() {
        console.error("Something went wrong while fetching student details!");
    }

    request.send(JSON.stringify(data));
}


function add_student_detail() {
    let data = {
        academic_year: document.getElementById("detail_academic_year").value,
        mark1: document.getElementById("detail_mark_1").value,
        mark2: document.getElementById("detail_mark_2").value,
        mark3: document.getElementById("detail_mark_3").value,
        remark: document.getElementById("detail_remark").value
    }
    data["detail_id"] = details && details.length ? details.length : 0;

    details.push(data);
    save_to_localStorage("details", details);

    let student_detail_list = document.getElementById("student_detail_list");
    let student_detail_data_html = generate_html("student_detail_data", data);
    student_detail_list.innerHTML = student_detail_list.innerHTML + student_detail_data_html.trim();
}


function remove_student_detail() {
    let remove_id = remove_detail_id;

    let data = {
        id: remove_id
    }

    details.forEach(function(detail){
        if(detail.detail_id == remove_id) {
            let detail_index = details.indexOf(detail);
            details.splice(detail_index, 1);
        }
    });
    save_to_localStorage("details", details);

    let student_detail_list = document.getElementById("student_detail_list");
    let detail_to_remove = document.getElementById(`detail_id_${remove_id}`);
    student_detail_list.removeChild(detail_to_remove);
}


function register_and_add_details() {
    let data = {
        name: document.getElementById("student_name").value,
        nrc: document.getElementById("student_nrc").value,
        dob: document.getElementById("student_dob").value,
        phone_no: document.getElementById("student_phone_no").value,
        email: document.getElementById("student_email").value,
        gender: document.getElementById("student_gender").value,
        nationality: document.getElementById("student_nationality").value,
        permanent_address: document.getElementById("student_address").value
    }

    let request = new XMLHttpRequest();
    request.open("POST", '/register');
    request.setRequestHeader("Content-Type", "application/json");
    
    request.onload = function() {
        if(request.status >= 200 && request.status < 400) {
            let response = JSON.parse(request.responseText);
            current_student = response;
            save_to_localStorage("student", current_student);
            console.log("current_student: ", current_student);

            let success_response = false;
            
            if(request.status == 200) {
                success_response = true;
            }

            if(success_response) {
                if(!document.getElementById("successful_registration")){
                    let student_container = document.getElementById("student_container");
                    let register_success_html = generate_html("register_success");
                    student_container.innerHTML = student_container.innerHTML + register_success_html;
                }

                setTimeout(function() {
                    let successful_registration_message = document.getElementById("successful_registration");
                    student_container.removeChild(successful_registration_message);

                    let form_container = document.getElementById("form_container");
                    let student_html = generate_html("student", current_student);
                    let student_detail_html = generate_html("student_detail");
                    form_container.innerHTML = student_html + student_detail_html;

                    let student_gender_selection = document.getElementById('student_gender');
                    for(let i = 0; i < student_gender_selection.options.length; i++) {
                        let option = student_gender_selection.options[i];
                        if (option.value === current_student.gender) {
                            option.selected = true;
                            break;
                        }
                    }

                    let student_nationality_selection = document.getElementById('student_nationality');
                    for(let i = 0; i < student_nationality_selection.options.length; i++) {
                        let option = student_nationality_selection.options[i];
                        if (option.value === current_student.nationality) {
                            option.selected = true;
                            break;
                        }
                    }

                    check_student_details();
                    submit_student_details();
                    
                }, 1000);
            }
        } else {
            console.error("error: ", response.status);
        }
    }

    request.onerror = function() {
        console.error("Something went wrong while registering student!");
    }

    request.send(JSON.stringify(data));
}


function check_submit() {
    current_student = load_from_localStorage("student");

    details = load_from_localStorage("details");

    if(current_student) {
        if(details.length > 0) {
            submit_student_details();
        } else {
            go_to_page("list");
        }
    } else {
        if(
            document.getElementById("student_name").value && document.getElementById("student_nrc").value &&
            document.getElementById("student_dob").value && document.getElementById("student_phone_no").value &&
            document.getElementById("student_email").value && document.getElementById("student_gender").value &&
            document.getElementById("student_nationality").value && document.getElementById("student_address").value
        ) {
            register_and_add_details();
        } else {
            let detail_container = document.getElementById("detail_container");
            let register_success_html = generate_html("register_fail");
            detail_container.innerHTML = detail_container.innerHTML + register_success_html;
        
            setTimeout(function() {
                let fail_registration_message = document.getElementById("fail_registration");
                detail_container.removeChild(fail_registration_message);
            }, 1000);
        }
    }
}


function submit_student_details() {
    current_student = load_from_localStorage("student");

    let data = {
        details: details,
        student_id: current_student.id
    }

    let request = new XMLHttpRequest();
    request.open("POST", '/submit_details');
    request.setRequestHeader("Content-Type", "application/json");
    
    request.onload = function() {
        if(request.status >= 200 && request.status < 400) {
            let response = JSON.parse(request.responseText);
            details = response
            details.forEach(function(detail) {
                detail["detail_id"] = details.indexOf(detail);
            })
            save_to_localStorage("details", details);

            let success_response = false;
            
            if(request.status == 200) {
                success_response = true;
            }

            if(success_response){
                go_to_page("list");
            }
        } else {
            console.error("error: ", response.status);
        }
    }

    request.onerror = function() {
        console.error("Something went wrong while submitting details!");
    }

    request.send(JSON.stringify(data));
    
}


function go_to_page(page_name) {
    if(page_name=="list") {
        window.location.href = '/list';
    } else if(page_name=="view") {
        window.location.href = "/view";
    } else if(page_name=="register") {
        window.location.href = "/create";
    } else if(page_name=="edit") {
        window.location.href = "/edit";
    } else if(page_name=="student_detail") {
        window.location.href = '/student_detail';
    }
}


function check_students() {
    let request = new XMLHttpRequest();
    request.open("GET", "/get_students");
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function() {
        if(request.status >= 200 && request.status < 400) {
            let response = JSON.parse(request.responseText);
            students = response

            let success_response = false;

            if(request.status == 200) {
                success_response = true;
            }

            if(success_response){
                let student_table_body = document.getElementById("student_table_body");
                students.forEach(function(student){
                    let student_table_data_html = generate_html("student_table_data", student);
                    student_table_body.innerHTML = student_table_body.innerHTML + student_table_data_html.trim();
                })
            }
        } else {
            console.error("error: ", response.status);
        }
    }

    request.onerror = function() {
        console.error("Something went wrong while fetching student details!");
    }

    request.send();
}


function check_view_student() {
    current_student = load_from_localStorage("student");
    
    let student_view_form = document.getElementById("student_view_form");
    let student_view_data_html = generate_html("student_view_data", current_student);
    student_view_form.innerHTML = student_view_form.innerHTML + student_view_data_html.trim();
}


function check_create_student() {
    let form_container = document.getElementById("form_container");
    let student_detail_html = generate_html("student_detail");
    form_container.innerHTML = form_container.innerHTML + student_detail_html;
}


function check_edit_student() {
    current_student = load_from_localStorage("student");

    let form_container = document.getElementById("form_container");
    let student_html = generate_html("student", current_student);
    let student_detail_html = generate_html("student_detail");
    form_container.innerHTML = student_html + student_detail_html;

    let student_gender_selection = document.getElementById('student_gender');
    for(let i = 0; i < student_gender_selection.options.length; i++) {
        let option = student_gender_selection.options[i];
        if (option.value === current_student.gender) {
            option.selected = true;
            break;
        }
    }

    let student_nationality_selection = document.getElementById('student_nationality');
    for(let i = 0; i < student_nationality_selection.options.length; i++) {
        let option = student_nationality_selection.options[i];
        if (option.value === current_student.nationality) {
            option.selected = true;
            break;
        }
    }

    check_student_details();
}


function view_student(id) {
    let view_id = id;
    
    let view_student = {};
    students.forEach(function(student) {
        if(student.id == view_id) {
            view_student = student
        }
    })

    save_to_localStorage("student", view_student);

    go_to_page("view");
}


function edit() {
    
}


function remove_student() {
    current_student = load_from_localStorage("student");

    let data = {
        id: current_student.id
    }

    let request = new XMLHttpRequest();
    request.open("POST", "/remove_student");
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function() {
        if(request.status >= 200 && request.status < 400) {
            let response = JSON.parse(request.responseText);
            let remove_data = response;

            let success_response = false;

            if(request.status == 200) {
                success_response = true;
            }

            if(success_response) {
                if(!document.getElementById("successful_delete")){
                    let student_container = document.getElementById("student_container");
                    let delete_success_html = generate_html("delete_success");
                    student_container.innerHTML = student_container.innerHTML + delete_success_html;
                }

                setTimeout(function() {
                    let successful_delete_message = document.getElementById("successful_delete");
                    student_container.removeChild(successful_delete_message);
                    remove_from_localStorage("student");
                    go_to_page("list");
                }, 1000);
            }
        } else {
            console.error("error: ", response.status);
        }
    }

    request.onerror = function() {
        console.error("Something went wrong while removing student!");
    }

    request.send(JSON.stringify(data));
}


function save_to_localStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}


function load_from_localStorage(name) {
    let data = JSON.parse(localStorage.getItem(name));
    return data;
}


function remove_from_localStorage(name) {
    localStorage.removeItem(name)
}


function record() {
    let student_data = students;
    // let details_data = details

    let student_sheet = XLSX.utils.json_to_sheet(student_data);
    // let details_sheet = XLSX.utils.json_to_sheet(details_data);

    let data_book = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(data_book, student_sheet, "Student");
    // XLSX.utils.book_append_sheet(data_book, details_sheet, "Details");

    XLSX.writeFile(data_book, "data.xlsx");
}


function set_remove_detail_id(id = null) {
    remove_detail_id = id;
}


if(window.location.href.includes("/list")) {
    check_students();
    remove_from_localStorage("student");
    remove_from_localStorage("details");
} else if(window.location.href.includes("/view")) {
    check_view_student();
    remove_from_localStorage("details");
} else if(window.location.href.includes("/create")) {
    check_create_student();
} else if(window.location.href.includes("/edit")) {
    check_edit_student();
} else if(window.location.href.includes("/student_detail")) {
    check_student_details();
} 