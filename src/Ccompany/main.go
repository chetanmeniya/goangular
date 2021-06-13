package main

import (
	"net/http"
	"log"
	"Ccompany/config"
	"Ccompany/controllers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
        log.Fatal(err)
    }
	r := mux.NewRouter()
	db := config.ConnectDB()
	dbsqlx := config.ConnectDBSqlx()
	h := controllers.NewBaseHandler(db)
	hsqlx := controllers.NewBaseHandlerSqlx(dbsqlx)

	r.HandleFunc("/listcompanies", hsqlx.GetCompaniesSqlxDataTables).Methods("POST")
	r.HandleFunc("/companies", hsqlx.GetCompaniesSqlx).Methods("GET")
	r.HandleFunc("/companies", hsqlx.PostCompanySqlx).Methods("POST")
	r.HandleFunc("/companies/{id}", hsqlx.GetCompany).Methods("GET")
	r.HandleFunc("/companies/{id}", hsqlx.EditCompanies).Methods("PUT")
	r.HandleFunc("/companies/{id}", hsqlx.DeleteCompany).Methods("DELETE")

	r.HandleFunc("/", h.GetCompanies)
	// r.HandleFunc("/sqlx", hsqlx.GetCompaniesSqlx)
	
	c := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},
        AllowCredentials: true,
		AllowedMethods:   []string{"GET", "DELETE", "POST", "PUT"},
    })

    s := c.Handler(r)
    http.ListenAndServe(":5000", s)
}