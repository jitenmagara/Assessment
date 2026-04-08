#include <iostream>
#include <fstream>
using namespace std;

int main() {
    int choice;
    float hours, total = 0;
    do {
        cout << "\n1. Log Study Hours\n2. View Report\n3. Exit\n";
        cin >> choice;
        if (choice == 1) {
            cout << "Enter hours: ";
            cin >> hours;
            ofstream out("data.txt", ios::app);
            out << hours << endl;
            out.close();
        } else if (choice == 2) {
            ifstream in("data.txt");
            while (in >> hours) {
                total += hours;
            }
            cout << "Total Hours: " << total << endl;
            cout << "Average: " << total / 7 << endl;
            in.close();
        }
    } while (choice != 3);
    return 0;
}