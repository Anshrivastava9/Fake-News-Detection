from asyncio.windows_events import NULL
from flask import Flask, render_template, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

app = Flask(__name__)
tfvect = TfidfVectorizer(stop_words='english', max_df=0.7)
loaded_model = NULL #= pickle.load(open('model.pkl', 'rb'))
dataframe = pd.read_csv('news.csv')
x = dataframe['text']
y = dataframe['label']
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=0)


def training():
    tfid_x_train = tfvect.fit_transform(x_train.astype('U'))
    tfid_x_test = tfvect.transform(x_test.astype('U'))
    classifier = PassiveAggressiveClassifier(max_iter=50)
    classifier.fit(tfid_x_train,y_train)
    y_pred = classifier.predict(tfid_x_test)
    score = accuracy_score(y_test,y_pred)
    print(f'Accuracy: {round(score*100,2)}%')
    cf = confusion_matrix(y_test,y_pred, labels=['FAKE','REAL'])
    pickle.dump(classifier,open('model.pkl', 'wb'))
    global loaded_model 
    loaded_model = pickle.load(open('model.pkl', 'rb'))

def fake_news_det(news):
    tfid_x_train = tfvect.fit_transform(x_train.astype('U'))
    tfid_x_test = tfvect.transform(x_test.astype('U'))
    # classifier = PassiveAggressiveClassifier(max_iter=50)
    # classifier.fit(tfid_x_train,y_train)
    # y_pred = classifier.predict(tfid_x_test)
    # score = accuracy_score(y_test,y_pred)
    # print(f'Accuracy: {round(score*100,2)}%')
    # cf = confusion_matrix(y_test,y_pred, labels=['FAKE','REAL'])
    # pickle.dump(classifier,open('model.pkl', 'wb'))
    # loaded_model = pickle.load(open('model.pkl', 'rb'))
    input_data = [news]
    vectorized_input_data = tfvect.transform(input_data)
    prediction = loaded_model.predict(vectorized_input_data)
    return prediction

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        message = request.form['message']
        pred = fake_news_det(message)
        print(pred)
        return render_template('index.html', prediction=pred)
    else:
        return render_template('index.html', prediction="Something went wrong")

if __name__ == '__main__':
    training()
    app.run(debug=True)
