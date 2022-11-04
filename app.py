from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.gds47iy.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/member1')
def member1():
   return render_template('member1.html')

@app.route('/member2')
def member2():
   return render_template('member2.html')

@app.route('/member3')
def member3():
   return render_template('member3.html')

@app.route('/member4')
def member4():
   return render_template('member4.html')

@app.route('/member5')
def member5():
   return render_template('member5.html')

@app.route('/guests', methods=["POST"])
def guest_post():
    guest_name_recive = request.form['guest_name_give']
    guest_comment_recive = request.form['guest_comment_give']
    guest_recive = request.form['guest_give']

    guest_list = list(db.guests.find({}, {'_id': False}))
    count = len(guest_list) + 1

    doc = {
        'name' : guest_name_recive,
        'comment' : guest_comment_recive,
        'num' : count,
        'change': 0,
        'guest': guest_recive
    }

    db.guests.insert_one(doc)

    return jsonify({'msg': '응원 감사합니다!'})

@app.route("/guests", methods=["GET"])
def guest_get():

    guest_list = list(db.guests.find({}, {'_id': False}))

    return jsonify({'guests': guest_list})

@app.route("/guests/remove", methods=["POST"])
def guest_remove():
    num_recive = request.form['num_give']

    db.guests.delete_one({'num': int(num_recive)})

    return jsonify({'msg': '삭제 완료!'})

@app.route("/guests/change", methods=["POST"])
def guest_change():
    num_recive = request.form['num_give']

    db.guests.update_one({'num': int(num_recive)}, {'$set': {'change': 2}})

    return jsonify({'msg': '수정 하시겠습니까?'})

@app.route("/guests/change_done", methods=["POST"])
def guest_change_done():
    num_recive = request.form['num_give']
    change_guest_comment_recive = request.form['change_guest_comment_give']

    db.guests.update_one({'num': int(num_recive)}, {'$set': {'change': 1, 'comment': change_guest_comment_recive}})

    return jsonify({'msg': '수정 완료!'})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)