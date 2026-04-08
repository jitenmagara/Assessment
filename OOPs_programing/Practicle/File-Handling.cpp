#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main() {
    ofstream cout("study.txt");
    cout << "Study 5 hours daily";
    cout.close();
    ifstream in("study.txt");
    string data;
    getline(in, data);
    cout << "Stored Data: " << data;
    in.close();
    return 0;
}