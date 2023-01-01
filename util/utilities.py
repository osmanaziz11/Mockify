
import pickle
import scipy as sp
   
class Predict:
    def __init__(self,text):
        self.text=text
        self.model__knn=pickle.load(open('./Models/knn.pkl', 'rb'))
        self.model__lg=pickle.load(open('./Models/lr.pkl', 'rb'))
        self.model__svm=pickle.load(open('./Models/svm.pkl', 'rb'))
        self.model__rfc=pickle.load(open('./Models/rfc.pkl', 'rb'))
        self.model__tfidf=pickle.load(open('./Models/tf-idf.pkl', 'rb'))

    def feature_extraction(self,text,text_len):

        vector=self.model__tfidf.transform([text])
        return sp.sparse.hstack((vector, text_len),dtype=float)
      
    def makePrediction(self,text,text_len):
        vector=self.feature_extraction(text,text_len)
        models=[self.model__knn,self.model__lg,self.model__rfc,self.model__svm]
        fake=[]
        not_fake=[]
        for i in range(0,len(models)):
            print(models[i].predict(vector))
            fake.append(1) if models[i].predict(vector)==1 else not_fake.append(0)
        return {"fake":fake,"not_fake":not_fake}


    def driver(self):
        try:
            res=self.makePrediction(self.text,len(self.text))
            if len(res['fake'])>len(res['not_fake']):
                return {"result":1,"percentage":len(res['fake'])/4*100}
            elif len(res['fake'])==len(res['not_fake']):
                 return {"result":0,"percentage":len(res['fake'])/4*100}
            else:
                 return {"result":-1,"percentage":len(res['not_fake'])/4*100}
        except Exception as e:
            print(e)
            return 0
    
