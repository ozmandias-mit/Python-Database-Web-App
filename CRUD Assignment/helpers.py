from flask import request, make_response, jsonify
import database

def register_student():
    data = request.get_json()

    register_data = {
    "name": data["name"],
    "nrc": data["nrc"],
    "dob": data["dob"],
    "phone_no": data["phone_no"],
    "email": data["email"],
    "gender": data["gender"],
    "nationality": data["nationality"],
    "permanent_address": data["permanent_address"],
    }

    global current_student
    global student_exists

    sql = (
        "SELECT id, name, nrc, dob, phone_no, email, gender, nationality, permanent_address FROM student "
        "WHERE email=%(email)s"
    )
    student = database.read(sql, register_data)
    print("student: ", student)

    if(student):
        student_exists = True
        current_student = student[0]

        register_data["id"] = current_student["id"]
        sql = (
            "UPDATE student SET name=%(name)s, nrc=%(nrc)s, dob=%(dob)s, phone_no=%(phone_no)s, "
            "email=%(email)s, gender=%(gender)s, nationality=%(nationality)s, "
            "permanent_address=%(permanent_address)s WHERE id=%(id)s"
        )
        database.update(sql, register_data)

        sql = (
        "SELECT id, name, nrc, dob, phone_no, email, gender, nationality, permanent_address FROM student "
        "WHERE email=%(email)s"
        )
        edit_student = database.read(sql, register_data)
        print("edit_student: ", edit_student)

        current_student = edit_student[0]
    else:
        sql = (
            "INSERT INTO student "
            "(name, nrc, dob, phone_no, email, gender, nationality, permanent_address) "
            "VALUES "
            "(%(name)s, %(nrc)s, %(dob)s, %(phone_no)s, "
            "%(email)s, %(gender)s, %(nationality)s, %(permanent_address)s)"
        )
        new_student_id = database.create(sql, register_data)
        new_student_data = {"id": new_student_id}
        print("new_student_data: ", new_student_data)

        sql = (
            "SELECT id, name, nrc, dob, phone_no, email, gender, nationality, permanent_address "
            "FROM student WHERE id=%(id)s"
        )
        new_student = database.read(sql, new_student_data)
        print("new_student: ", new_student)
        
        student_exists = True
        current_student = new_student[0]
    print("current_student: ", current_student)

    student_data = {
        "id": current_student["id"],
        "name": current_student["name"],
        "nrc": current_student["nrc"],
        "dob": str(current_student["dob"]),
        "phone_no": current_student["phone_no"],
        "email": current_student["email"],
        "gender": list(current_student["gender"])[0],
        "nationality": list(current_student["nationality"])[0],
        "permanent_address": current_student["permanent_address"]
    }
    print("student_data: ", student_data)

    response = make_response(jsonify(student_data), 200)
    response.headers['Content-Type'] = 'application/json'
    
    return response


def fetch_students():
    sql = (
        "SELECT id, name, nrc, dob, phone_no, email, gender, nationality, permanent_address "
        "FROM student ORDER BY id DESC LIMIT 10"
    )
    students = database.read(sql, None)

    for student in students:
        student["dob"] = str(student["dob"])
        student["gender"] = list(student["gender"])[0]
        student["nationality"] = list(student["nationality"])[0]


    response = make_response(students, 200)

    return response


def fetch_student_details():
    data = request.get_json()

    detail_data = {
        "id": data["id"]
    }
    print(detail_data)

    sql = (
        "SELECT id, student_id, academic_year, mark1, mark2, mark3, remark FROM student_detail "
        "WHERE student_id=%(id)s"
    )
    details = database.read(sql, detail_data)

    response = make_response(details, 200)
    
    return response


def add_student_detail():
    data = request.get_json()

    detail_data = {
        "student_id": data["student_id"],
        "academic_year": data["academic_year"],
        "mark1": data["mark1"],
        "mark2": data["mark2"],
        "mark3": data["mark3"],
        "remark": data["remark"]
    }

    global current_detail

    sql = (
        "INSERT INTO student_detail (student_id, academic_year, mark1, mark2, mark3, remark) "
        "VALUES (%(student_id)s, %(academic_year)s, %(mark1)s, %(mark2)s, %(mark3)s, %(remark)s)"
    )
    new_detail_id = database.create(sql, detail_data)
    new_detail_data = {"id": new_detail_id}

    sql = (
        "SELECT id, student_id, academic_year, mark1, mark2, mark3, remark FROM student_detail "
        "WHERE id=%(id)s"
    )
    new_detail = database.read(sql, new_detail_data)
    print("new_detail: ", new_detail)

    current_detail = new_detail[0]
    print("current_detail: ", current_detail)

    student_detail_data = {
        "id": current_detail["id"],
        "student_id": current_detail["student_id"],
        "academic_year": current_detail["academic_year"],
        "mark1": current_detail["mark1"],
        "mark2": current_detail["mark2"],
        "mark3": current_detail["mark3"],
        "remark": current_detail["remark"]
    }
    print("student_detail_data: ", student_detail_data)

    response = make_response(jsonify(student_detail_data), 200)
    response.headers['Content-Type'] = 'application/json'
    
    return response


def remove_student_detail():
    data = request.get_json()

    detail_data = {
        "id": data["id"]
    }
    print(detail_data)

    sql = ("DELETE FROM student_detail WHERE id=%(id)s")
    delete_count = database.delete(sql, detail_data)

    student_detail_data = {
        "deleted_data": delete_count
    }
    
    response = make_response(jsonify(student_detail_data), 200)
    response.headers['Content-Type'] = 'application/json'

    return response


def submit_student_details():
    data = request.get_json()
    print("details: ", data)

    details = data["details"]
    details_data = {
        "student_id": data["student_id"]
    }
    print(details_data)

    sql = ("DELETE FROM student_detail WHERE student_id=%(student_id)s")
    database.delete(sql, details_data)

    for detail in details:
        detail_data = {
            "student_id": details_data["student_id"],
            "academic_year": detail["academic_year"],
            "mark1": detail["mark1"],
            "mark2": detail["mark2"],
            "mark3": detail["mark3"],
            "remark": detail["remark"]
        }
        
        sql = (
            "INSERT INTO student_detail (student_id, academic_year, mark1, mark2, mark3, remark) "
            "VALUES (%(student_id)s, %(academic_year)s, %(mark1)s, %(mark2)s, %(mark3)s, %(remark)s)"
        )
        database.create(sql, detail_data)   

    sql = (
        "SELECT id, student_id, academic_year, mark1, mark2, mark3, remark FROM student_detail "
        "WHERE student_id=%(student_id)s"
    )
    new_details = database.read(sql, details_data)

    response = make_response(new_details, 200)
    response.headers['Content-Type'] = 'application/json'

    return response


def remove_student_data():
    data = request.get_json()

    student_data = {
        "id": data["id"]
    }
    print(student_data)

    sql = ("DELETE FROM student_detail WHERE student_id=%(id)s")
    delete_count = database.delete(sql, student_data)

    sql = ("DELETE FROM student WHERE id=%(id)s")
    delete_count = database.delete(sql, student_data)

    delete_student_data = {
        "deleted_data": delete_count
    }
    
    response = make_response(jsonify(delete_student_data), 200)
    response.headers['Content-Type'] = 'application/json'
    
    return response