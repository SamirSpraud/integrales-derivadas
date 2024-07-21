from flask import Flask, request, jsonify
from sympy import symbols, integrate, diff, sympify
from sympy.core.sympify import SympifyError
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

def format_result(result):
    """ Formatea el resultado para que sea más amigable con el usuario """
    result_str = str(result)
    result_str = result_str.replace('**', '^')
    return result_str

@app.route('/integral', methods=['POST'])
def calculate_integral():
    data = request.get_json()
    expression = data.get('expression')
    variable = data.get('variable')
    a = data.get('a')
    b = data.get('b')
    
    if not expression or not variable:
        return jsonify({'error': 'Se requiere proporcionar una expresión y una variable'}), 400
    
    try:
        x = symbols(variable)
        expr = sympify(expression)
        
        if a is not None and b is not None:
            # Calcular la integral definida
            result = integrate(expr, (x, a, b))
        else:
            # Calcular la integral indefinida
            result = integrate(expr, x)
        
        formatted_result = format_result(result)
        return jsonify({'result': formatted_result})
    
    except SympifyError as error:
        print(f"Error al convertir la expresión matemática: {error}")
        return jsonify({'error': 'La expresión matemática no es válida'}), 400
    
    except ValueError as error:
        print(f"Error al calcular la integral: {error}")
        return jsonify({'error': str(error)}), 400
    
    except Exception as error:
        print(f"Error al calcular la integral: {error}")
        return jsonify({'error': 'No se pudo calcular la integral'}), 400

@app.route('/derivada', methods=['POST'])
def calculate_derivative():
    data = request.get_json()
    expression = data.get('expression')
    variable = data.get('variable')
    
    if not expression or not variable:
        return jsonify({'error': 'Se requiere proporcionar una expresión y una variable'}), 400
    
    try:
        x = symbols(variable)
        expr = sympify(expression)
        result = diff(expr, x)
        formatted_result = format_result(result)
        return jsonify({'result': formatted_result})
    
    except SympifyError as error:
        print(f"Error al convertir la expresión matemática: {error}")
        return jsonify({'error': 'La expresión matemática no es válida'}), 400
    
    except ValueError as error:
        print(f"Error al calcular la derivada: {error}")
        return jsonify({'error': str(error)}), 400
    
    except Exception as error:
        print(f"Error al calcular la derivada: {error}")
        return jsonify({'error': 'No se pudo calcular la derivada'}), 400

if __name__ == '__main__':
    app.run(port=3000)
