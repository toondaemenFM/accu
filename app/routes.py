# Copyright (c) 2025 Flanders Make vzw
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
 
from flask import render_template, request, redirect, url_for, jsonify
import yaml

def register_routes(app):
  @app.route('/')
  def index():
    return render_template('index.html')

  @app.route('/enter_value', methods=['POST'])
  def enter_value_callback():
    data = request.get_json()
    name = data.get('name').lower()
    
    
    with open ('names.yaml', 'r') as yaml_file:
      yaml_data = yaml.safe_load(yaml_file)
    
    if name in (n.lower() for n in yaml_data['green']):
      print('GREEN')
      return jsonify({"result": "green"}), 200
    elif name in (n.lower() for n in yaml_data['red']):
      print("RED")
      return jsonify({"result": "red"}), 200
    else:
      print("NONE")
      return jsonify({"result": ""}), 200