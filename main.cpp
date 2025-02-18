#include <iostream>
using namespace std;

struct Student {
    string name;
    int age;
    float gpa;
};

int main() {
    Student student1;

    cout << "Enter student name: ";
    getline(cin, student1.name);

    cout << "Enter student age: ";
    cin >> student1.age;

    cout << "Enter student GPA: ";
    cin >> student1.gpa;

    cout << "\nStudent Details:" << endl;
    cout << "Name: " << student1.name << endl;
    cout << "Age: " << student1.age << endl;
    cout << "GPA: " << student1.gpa << endl;

    return 0;
}