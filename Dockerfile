FROM node:13-alpine

# las variables de entorno se las ponemos al crear la app, pero las podemos especificar aqui

WORKDIR /app
# creamos directorio donde dejaremos todas nuestras carpetas y donde ejecutaremos comandos(generalmente), se puede hacer uno mucho mas largo, pero no se que para que

COPY "package.json" /app
# copiamos el packages.json nuestro a el directorio de trabajo. este paso lo hacemos antes ya que el package json lleva instrucciones especificas y todas nuestras dependencias
# si lo copiaramos en conjunto con el de abajo(el COPY . /app) habria problemas al hace npm intall


RUN npm install
# corremos install para instalar todas las dependencias que tenga el proyecto

COPY . /app
# copiamos todo lo que esta en nuestro proyecto actual(source) se puede indicar de donde sacan los datos y lo ponemos en directorio de trabajo

RUN npm run build
# corremos este comando para hacer que la aplicacion sea ejecutable en js(las app nest estan en ts generalmente)

EXPOSE 3000
# exponemos el puerto que va a tomar nuestra app una ves que ya este dockerizada

CMD ["node","dist/main"]
# este comando ejecutara la app por si sola(es un autoejecutable)