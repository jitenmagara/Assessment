#include <iostream>
using namespace std;

int main() {
    int hours;
    cout << "Enter study hours: ";
    cin >> hours;
    if (hours >= 6) {
        cout << "Excellent! Keep it up!";
    } else if (hours >= 3) {
        cout << "Good effort! Try to improve.";
    } else {
        cout << "You need to focus more!";
    }
    return 0;
}