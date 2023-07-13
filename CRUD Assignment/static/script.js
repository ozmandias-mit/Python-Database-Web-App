let current_student = {};
let students = [];
let detail = {};
let details = [];
let remove_detail_id = null;
let total_students = 0;
let pagination_students = 0;
let query_data = {
    "search": "",
    "page": 0
};
let back_pagination_page = -1;
let back_pagination_students = -1;
let total_pages = 0;
let page_maximum_students = 10;

function register() {
    return new Promise(function(resolve, reject) {
        let data = {
            name: document.getElementById("student_name").value,
            nrc: document.getElementById("student_nrc").value,
            dob: document.getElementById("student_dob").value,
            phone_no: document.getElementById("student_phone_no").value,
            email: document.getElementById("student_email").value,
            gender: document.getElementById("student_gender").value,
            nationality: document.getElementById("student_nationality").value,
            permanent_address: document.getElementById("student_address").value,
            profile_picture: current_student && current_student["profile_picture"] ? current_student["profile_picture"] : null
        }
    
        let request = new XMLHttpRequest();
        request.open("POST", '/register');
        request.setRequestHeader("Content-Type", "application/json");
        
        request.onload = function() {
            if(request.status >= 200 && request.status < 400) {
                let response = JSON.parse(request.responseText);
                current_student = response;
                save_to_localStorage("student", current_student);
    
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
    
                    setTimeout(async function() {
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
    
                        await check_student_details();
                    }, 1000);
                }

                resolve("success");
            } else {
                console.error("error: ", response.status);
                reject("error");
            }
        }
    
        request.onerror = function() {
            console.error("Something went wrong while registering student!");
        }
    
        request.send(JSON.stringify(data));
    });
}


function check_student_details() {
    return new Promise(function(resolve, reject) {
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

                resolve("success");
            } else {
                console.error("error: ", response.status);
                reject("error");
            }
        }
    
        request.onerror = function() {
            console.error("Something went wrong while fetching student details!");
        }
    
        request.send(JSON.stringify(data));
    });
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


async function check_submit() {
    current_student = load_from_localStorage("student");

    details = load_from_localStorage("details");

    if(current_student) {
        if(details && details.length > 0) {
            await register().then(async function(res) {
                await submit_student_details();
            });
        } else {
            await register().then(function(res) {
                go_to_page("list");
            });
        }
    } else {
        if(
            document.getElementById("student_name").value && document.getElementById("student_nrc").value &&
            document.getElementById("student_dob").value && document.getElementById("student_phone_no").value &&
            document.getElementById("student_email").value && document.getElementById("student_gender").value &&
            document.getElementById("student_nationality").value && document.getElementById("student_address").value
        ) {
            if(details && details.length > 0) {
                await register().then(async function(res) {
                    await submit_student_details();
                });
            } else {
                await register().then(function(res) {
                    go_to_page("list");
                });
            }
        } else {
            let detail_container = document.getElementById("detail_container");
            let register_fail_html = generate_html("register_fail");
            detail_container.innerHTML = detail_container.innerHTML + register_fail_html;
        
            setTimeout(function() {
                let fail_registration_message = document.getElementById("fail_registration");
                detail_container.removeChild(fail_registration_message);
            }, 1000);
        }
    }
}


function submit_student_details() {
    return new Promise(function(resolve, reject) {
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

                resolve("success");
            } else {
                console.error("error: ", response.status);
                reject("error");
            }
        }
    
        request.onerror = function() {
            console.error("Something went wrong while submitting details!");
        }
    
        request.send(JSON.stringify(data));
    });
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
    query_data["search"] = document.getElementById("search_bar").value;
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        request.open("POST", "/get_students");
        request.setRequestHeader("Content-Type", "application/json");
    
        request.onload = function() {
            if(request.status >= 200 && request.status < 400) {
                let response = JSON.parse(request.responseText);
                
                students = response.students;
                if(students && students.length > 0) {
                    if(query_data["page"] > back_pagination_page) {
                        pagination_students = pagination_students + students.length;
                    } else {
                        pagination_students = pagination_students - back_pagination_students;
                    }
                }
                total_students = response.total_students;
                total_pages = Math.ceil(total_students / page_maximum_students);
    
                let success_response = false;
    
                if(request.status == 200) {
                    success_response = true;
                }
    
                if(success_response){
                    let student_table_body = document.getElementById("student_table_body");
                    students.forEach(function(student){
                        let student_table_data_html = generate_html("student_table_data", student);
                        student_table_body.innerHTML = student_table_body.innerHTML + student_table_data_html.trim();
                    });

                    let pagination_text = document.getElementById("pagination_text");
                    pagination_text.innerHTML = `<span>Page ${query_data["page"] + 1}/${total_pages}</span>`;
                }

                resolve("success");
            } else {
                console.error("error: ", response.status);
                reject("error");
            }
        }
    
        request.onerror = function() {
            console.error("Something went wrong while fetching student details!");
        }
    
        request.send(JSON.stringify(query_data));
    });
}


function check_view_student() {
    remove_from_localStorage("details");
    current_student = load_from_localStorage("student");
    
    let student_view_form = document.getElementById("student_view_form");
    let student_view_data_html = generate_html("student_view_data", current_student);
    student_view_form.innerHTML = student_view_form.innerHTML + student_view_data_html.trim();

    check_student_details().then(function(res) {
        let student_detail_list = document.getElementById("student_detail_list");
        student_detail_list.innerHTML = "";
        if(details && details.length > 0) {
            details.forEach(function(detail) {
                let student_detail_data_html = generate_html("details_view_data", detail);
                student_detail_list.innerHTML = student_detail_list.innerHTML + student_detail_data_html.trim();
            });
        } else {
            let student_detail_data_html = generate_html("no_details_view_data");
            student_detail_list.innerHTML = student_detail_list.innerHTML + student_detail_data_html.trim();
        }
        remove_from_localStorage("details");
    });
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
    return new Promise(function(resolve, reject) {
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

                resolve("success");
            } else {
                console.error("error: ", response.status);
                reject("error");
            }
        }
    
        request.onerror = function() {
            console.error("Something went wrong while removing student!");
        }
    
        request.send(JSON.stringify(data));
    });
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


function export_records() {
    let student_data = students;
    // let details_data = details
    student_data.forEach(function(student) {
        var words = student.name.split(' ');

        // Capitalize the first character of each word
        var capitalizedWords = words.map(function(word) {
            if (word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
            } else {
            return word;
            }
        });

        var capitalizedName = capitalizedWords.join(' ');

        student.name = capitalizedName;
    });

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


async function search_student() {
    total_students = 0;
    pagination_students = 0;
    query_data["page"] = 0;
    back_pagination_page = -1;
    back_pagination_students = -1;

    let student_table_body = document.getElementById("student_table_body");
    student_table_body.innerHTML = "";

    let pagination_container = document.getElementById("pagination_container");
    pagination_container.innerHTML = "";
    let pagination_back_html = "";
    let pagination_next_html = ""; 

    await check_students().then(function(res) {
        if(query_data["page"] > 0) {
            pagination_back_html = generate_html("pagination_back");
        }
        if(pagination_students < total_students) {
            pagination_next_html = generate_html("pagination_next");
        }
        pagination_container.innerHTML = pagination_back_html + pagination_next_html;
    });
}


async function paginate(method = '') {
    back_pagination_page = query_data["page"];
    back_pagination_students = students.length;

    if(method == "next") {
        query_data["page"] = query_data["page"] + 1;
    } else if(method == "back") {
        query_data["page"] = query_data["page"] - 1;
    }
    
    let student_table_body = document.getElementById("student_table_body");
    student_table_body.innerHTML = "";

    let pagination_container = document.getElementById("pagination_container");
    pagination_container.innerHTML = "";
    let pagination_back_html = "";
    let pagination_next_html = ""; 
    
    
    await check_students().then(function(res) {
        if(query_data["page"] > 0) {
            pagination_back_html = generate_html("pagination_back");
        }
        if(pagination_students < total_students) {
            pagination_next_html = generate_html("pagination_next");
        }
        pagination_container.innerHTML = pagination_back_html + pagination_next_html;
    });
}


async function exportPDF() {
    current_student = load_from_localStorage("student");
    await check_student_details().then(function(res) {
        let student_detail_list = document.getElementById("student_detail_list");
        student_detail_list.innerHTML = "";
        if(details && details.length > 0) {
            details.forEach(function(detail) {
                let student_detail_data_html = generate_html("details_view_data", detail);
                student_detail_list.innerHTML = student_detail_list.innerHTML + student_detail_data_html.trim();
            });
        } else {
            let student_detail_data_html = generate_html("no_details_view_data");
            student_detail_list.innerHTML = student_detail_list.innerHTML + student_detail_data_html.trim();
        }
    });

    let pdf_data = {
        current_student: current_student,
        details: details
    }    
    remove_from_localStorage("details");

    let student_photo = await url_to_image(
        current_student["profile_picture"] ? 
        current_student["profile_picture"] : '../static/profiles/blank_profile_picture.png'
    );

    // Define table layout and styles
    const tableLayout = {
        defaultBorder: true,
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#dddddd',
        vLineColor: () => '#dddddd',
    };

    const profileTableData = { 
        image: student_photo,
        width: 50,
        height: 50,
        fit: [50, 50],
        alignment: 'center'
    };
    const profileTable = {
        body: [
            [profileTableData]
        ]
    }

    // Create a table for the student data
    const studentTable = {
        headerRows: 1,
        // widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
        body: [
          ['Name', 'NRC', 'DOB', 'Phone', 'Email', 'Gender', 'Nationality', 'Address'],
          [
            pdf_data.current_student.name,
            pdf_data.current_student.nrc,
            pdf_data.current_student.dob,
            pdf_data.current_student.phone_no,
            pdf_data.current_student.email,
            pdf_data.current_student.gender,
            pdf_data.current_student.nationality,
            pdf_data.current_student.permanent_address
          ],
        ],
      };

    let detailsData = [];
    if(pdf_data.details.length > 0) {
        detailsData = pdf_data.details.map(function(detail) {
            return [
                detail.academic_year, detail.mark1, detail.mark2, detail.mark3, detail.remark
            ]
        })
    } else {
        detailsData.push(["None", "None", "None", "None", "None"]);
    }
    // Create a table for the details data
    const detailsTable = {
    headerRows: 1,
    // widths: ['*', '*', '*', '*', '*'],
    body: [
        ['Year', 'Mark 1', 'Mark 2', 'Mark 3', 'Remark'],
        ...detailsData
    ],
    };

    // Create the PDF document definition
    let docDefinition = {
        content: [
        { table: profileTable, layout: tableLayout, absolutePosition: { x: 500, y: 20 } },
        { text: 'Student', style: 'header', absolutePosition: { x: 10, y: 80 } },
        { table: studentTable, layout: tableLayout, absolutePosition: { x: 10, y: 110 } },
        { text: 'Details', style: 'header', absolutePosition: { x: 10, y: 190 } },
        { table: detailsTable, layout: tableLayout, absolutePosition: { x: 10, y: 220 } },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 10, 0, 10],
            }
        },
    };
    
    // Generate the PDF
    pdfMake.createPdf(docDefinition).download('student_information.pdf');
}


function url_to_image(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = reject;
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }); 
}


function convert_profile_picture(event) {
    const file = event.target.files[0];

    if(file) {
        // const reader = new FileReader();
        // reader.onload = async function(event) {
        //    // let binaryData = reader.result;
        //     let binaryData = event.target.result;
        //     current_student["profile_picture"] = binaryData;
        // };
        // reader.readAsBinaryString(file);

        let profile_src = "../static/profiles/" + file.name;
        current_student["profile_picture"] = profile_src;
        save_to_localStorage("student", current_student);
        
        let student_profile_img = document.getElementById("student_profile_img");
        student_profile_img.src = current_student["profile_picture"];
    }
}


function upload_profile_picture() {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        request.open("POST", '/profile_picture');
        request.setRequestHeader("Content-Type", "application/json");
        
        request.onload = function() {

        }

        request.onerror = function() {

        }

        request.send(JSON.stringify({}));
    });
}


function select_excel_file() {
    let excel_input = document.getElementById("excel_input");
    excel_input.click();
}


function import_records() {
    const excel_input = document.getElementById("excel_input");
    const file = excel_input.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 0 });
        rows.forEach(function(row) {
            row.profile_picture = row.profile_picture ? row.profile_picture : null;
        });
        
        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.open("POST", '/import_records');
            request.setRequestHeader("Content-Type", "application/json");
            
            request.onload = function() {
                if(request.status >= 200 && request.status < 400) {
                    let response = request.responseText
        
                    let success_response = false;
                    
                    if(request.status == 200) {
                        success_response = true;

                        let student_table_body = document.getElementById("student_table_body");
                        student_table_body.innerHTML = "";
                        check_students();
                    }
    
                    resolve("success");
                } else {
                    console.error("error: ", response.status);
                    reject("error");
                }
            }
    
            request.onerror = function() {
                console.error("Something went wrong while importing students!");
            }
    
            request.send(JSON.stringify(rows));
        });
      };
  
      reader.readAsArrayBuffer(file);
    }
  }


if(window.location.href.includes("/list")) {
    check_students();
    remove_from_localStorage("student");
    remove_from_localStorage("details");
} else if(window.location.href.includes("/view")) {
    check_view_student();
} else if(window.location.href.includes("/create")) {
    check_create_student();
} else if(window.location.href.includes("/edit")) {
    check_edit_student();
} else if(window.location.href.includes("/student_detail")) {
    check_student_details();
} 